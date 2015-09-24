var loopback = require('loopback');
module.exports = function(app) {
  var Oonitarian = app.models.oonitarian;
  var Team = app.models.team;
  var ds = app.datasources.postgres;
  
  ds.createModel(Team.name, Team.properties, Team.options);
  ds.createModel(Oonitarian.name, Oonitarian.properties, Oonitarian.options);

  ds.autoupdate('team', function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    ds.discoverModelProperties('team', function (err, props) {
      console.log(props);
    });
  });

  ds.autoupdate('oonitarian', function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    ds.discoverModelProperties('oonitarian', function (err, props) {
      console.log(props);
    });
  });
};
