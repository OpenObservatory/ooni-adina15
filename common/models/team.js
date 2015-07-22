module.exports = function(Team) {
  Team.join = function(team_id, cb) {
    var response = [
      "member1",
      "member2"
    ];
    cb(null, response);
  }

  Team.leave = function(team_id, cb) {
    var response = [
      "member1"
    ];
    cb(null, response);
  }

  Team.remoteMethod(
    'leave',
    {
      http: {path: '/leave', verb: 'post'},
      accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
      returns: {arg: 'members', type: ['string']}
    }
  )

  Team.remoteMethod(
    'join',
    {
      http: {path: '/join', verb: 'post'},
      accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
      returns: {arg: 'members', type: ['string']}
    }
  )
};
