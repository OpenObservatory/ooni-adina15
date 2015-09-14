var loopback = require('loopback');
var app = require('../../server/server');

module.exports = function(Team) {
  var Oonitarian = app.models.Oonitarian;

  Team.join = function(team_id, cb) {
    var ctx = loopback.getCurrentContext(),
      currentUser = ctx.get('currentUser');
    Team.findById(team_id, function (err, team) {
      if (err) {
        console.log(err);
        return cb(err);
      }
      if (team.teamLeaderId == null) {
        team.teamLeaderId = currentUser.id;
        team.save();
      }
      currentUser.teamId = team.id;  
      currentUser.save();
      cb(null, team);
    });
  }
  Team.remoteMethod(
    'join',
    {
      http: {path: '/join', verb: 'post'},
      accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
      returns: {arg: 'members', type: ['string']}
    }
  )

  Team.createJoin = function(name, longDescription, shortDescription,
                             membersMaximum, cb) {
    var ctx = loopback.getCurrentContext(),
      currentUser = ctx.get('currentUser');
    Team.create({
      name: name,
      longDescription: longDescription,
      shortDescription: shortDescription,
      membersMaximum: membersMaximum,
      teamLeaderId: currentUser.id
    }, function(err, team){
      if (err) {
        console.log(err);
        return cb(err);
      }
      currentUser.teamId = team.id;
      currentUser.save();
      cb(null, team);
    })
  }
  Team.remoteMethod(
    'createJoin',
    {
      http: {path: '/createJoin', verb: 'post'},
      accepts: [
        {arg: 'name', type: 'string' },
        {arg: 'shortDescription', type: 'string' },
        {arg: 'longDescription', type: 'string' },
        {arg: 'membersMaximum', type: 'number' }
      ],
      returns: {arg: 'team', type: 'object'}
    }
  )

  Team.leave = function(team_id, cb) {
    var ctx = loopback.getCurrentContext(),
      currentUser = ctx.get('currentUser');
    Team.findById(team_id, function (err, team) {
      if (err) {
        console.log(err);
        return cb(err);
      }
      if (currentUser.teamId === team.id) {
        currentUser.teamId = null;
        currentUser.save();
        app.models.Oonitarian.find({
          where: {
            "teamId": team.id
          }
        }, function(err, members) {
          if (err) {
            console.log(err);
            return cb(err);
          }
          var newMembers = [];
          // XXX The current user is still listed as a member
          // and so we need to filter he/she out
          for (var i = 0; i < members.length; ++i) {
            if (members[i].id != currentUser.id) {
              newMembers.push(members[i]);
            }
          }
          if (team.teamLeaderId == currentUser.id) {
            if (newMembers.length > 0) {
              team.teamLeaderId = newMembers[0].id;
            } else {
              team.teamLeaderId = null;
            }
          }
          team.save();
          cb(null, newMembers);
        });
      } else {
        cb(new Error("You are not part of that team"), null);
      }
    });
  }
  Team.remoteMethod(
    'leave',
    {
      http: {path: '/leave', verb: 'post'},
      accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
      returns: {arg: 'members', type: ['string']}
    }
  )

  Team.listTeams = function(cb) {
    Team.find({
      fields: {
        created: false
      }
    }, function(err, teams){
      if (err) {
        console.log(err);
        return cb(err);
      }
      var team_count = teams.length,
        team_list = [];
      function addTeamToList(team, members) {
        team.members = [];
        members.forEach(function(member){
          is_leader = false;
          if (member.id == team.teamLeaderId) {
            is_leader = true;
          }
          team.members.push({
            name: member.name,
            email: member.email,
            skills: member.skills,
            portfolio_url: member.portfolio_url,
            twitter: member.twitter,
            leader: is_leader
          })
        });
        team_list.push(team);
        if (team_list.length == team_count) {
          cb(null, team_list);
        }
      }
      teams.forEach(function(team) {
        app.models.Oonitarian.find({
          where: {
            "teamId": team.id
          }
        }, function(err, members) {
          addTeamToList(team, members);
        });
      });
    });
  }
  Team.remoteMethod(
    'listTeams',
    {
      http: {path: '/list-teams', verb: 'get'},
      returns: {arg: 'teams', type: 'array'}
    }
  )
};
