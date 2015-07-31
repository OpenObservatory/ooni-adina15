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
      cb(null, currentUser);
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
