module.exports = function(app) {
  var Oonitarian = app.models.oonitarian;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Team = app.models.team;
  var ds = app.datasources.postgres;
  
  ds.createModel(Team.name, Team.properties, Team.options);
  ds.createModel(Oonitarian.name, Oonitarian.properties, Oonitarian.options);

  //ds.autoupdate(Team.name, function (err, result) {
  ds.automigrate(function (err, result) {
    if (err) {
      console.log(err);
    }
    ds.discoverModelProperties('team', function (err, props) {
      console.log(props);
    });
  });

  //ds.autoupdate(Oonitarian.name, function (err, result) {
  ds.automigrate(function (err, result) {
    if (err) {
      console.log(err);
    }
    ds.discoverModelProperties('oonitarian', function (err, props) {
      console.log(props);
        Oonitarian.create({
          username: "antani",
          email: "root@gmail.com",
          password: "something",
          name: "Jane",
          surname: "Doe",
          skills: ["antani"]
        }, function(err, oonitarian){
          if (err) {
            console.log(err);
            console.log(err.details.codes.username);
            console.log(err.details.messages.email);
          }
          console.log(oonitarian);
          oonitarian.team.create({
            "name": "Some team name",
            "longDescription": "some description",
            "shortDescription": "some long desc"
          }, function(err, team){
            if (err) {
              console.log(err);
            }
            oonitarian.teamId = team.id;
            oonitarian.save();
            console.log(oonitarian);
            oonitarian.team(function(err, t){
              console.log(t);
            });
          });
        });


    });
  });
  
};
