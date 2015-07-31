var loopback = require('loopback');

module.exports = function(Team) {
  Team.join = function(team_id, cb) {
    var ctx = loopback.getCurrentContext(),
      currentUser = ctx.get('currentUser');
    Team.findById(team_id, function(err, team){
      if (err) {
        console.log(err);
        return cb(err);
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

  Team.createJoin = function(name, longDescription, shortDescription, cb) {
    var ctx = loopback.getCurrentContext(),
      currentUser = ctx.get('currentUser');
    Team.create({
      name: name,
      longDescription: longDescription,
      shortDescription: shortDescription,
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
        {arg: 'name', type: 'string', http: { source: 'query' } },
        {arg: 'shortDescription', type: 'string', http: { source: 'query' } },
        {arg: 'longDescription', type: 'string', http: { source: 'query' } }
      ],
      returns: {arg: 'team', type: 'object'}
    }
  )

  Team.leave = function(team_id, cb) {
    var ctx = loopback.getCurrentContext(),
      currentUser = ctx.get('currentUser');
    // XXX we can probably remove this extra lookup
    Team.findById(team_id, function(err, team){
      if (err) {
        console.log(err);
        return cb(err);
      }
      if (oonitarian.teamId === team.id) {
        oonitarian.teamId = null;
        oonitarian.save();
        cb(null, oonitarian);
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
};
