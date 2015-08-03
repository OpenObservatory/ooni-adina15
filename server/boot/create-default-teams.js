var loopback = require('loopback');
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

    ds.discoverModelProperties('team', function (err, props) {

      project1 = {
        name: "World Censorship Report",
        shortDescription: "Automatically generte monthly censorship reports for a given country.",
        longDescription: "Automatically generate monthly reports on censorship worldwide with comparisons to the previous months. The output of this is a PDF or static HTML report containing visualisations and generated natural language that clearly explains to the reader any shifts in trends with censorship on an AS, country or global level. These reports may be read by activists, journalists or researchers to become aware of any new developing problems with censorship. This may only include a subset of the OONI tests for the prototype, but should be easily expandable in the future. For the hackfest, three months of reports are produced by ignoring the data from months after the date of the report."
      };
      
      project2 = {
        name: "World Censorship Map",
        shortDescription: "Automatically generate choropleth maps for visually ranking and comparing reports at a country level.",
        longDescription: "Automatically generate choropleth maps for visually ranking and comparing reports at a country level for metrics such as numbers of reports, most recent reporting country, and incidence of censorship or interference. These maps are a familiar representation that contextualizes global censorship for a wide audience of readers."
      };

      project3 = {
        name: "OONI Data Metrics",
        shortDescription: "Generate graphs for reporting metadata such as number of reports received in total, per time interval, amount of storage used etc.",
        longDescription: "Generate graphs for reporting metadata such as number of reports received in total, per time interval, amount of storage or resources used, and most reported or under-reported ISPs."
      };

      project4 = {
        name: "OONI pipeline (XXX better name)",
        shortDescription: "Redesign the OONI API (current alpha website) to provide meaningful visualizations per country regarding censorship events and network anomalies.",
        longDescription: "XXX"
      };
      
      project5 = {
        name: "Network Meter",
        shortDescription: "Design the graphical user interface (GUI) for the network meter frontend to network measurement tools.",
        longDescription: "Network Meter is a graphical front-end based on node.js and Electron, currently in early development. It aspires to be a GUI for OONI and other network tools and aims to make running networking diagnostic tests easier for average users. Help design the user interface for Network Meter in general or help with the output presentation for OONI plugin specifically."
      };

      Team.create(project1);
      Team.create(project2);
      Team.create(project3);
      Team.create(project4);
      Team.create(project5);
    });

  //   ds.discoverModelProperties('oonitarian', function (err, props) {
  //       Oonitarian.create({
  //         username: "antani",
  //         email: "root@gmail.com",
  //         password: "something",
  //         name: "JaneDoer",
  //         real_name: "Jane",
  //         real_surname: "Doe",
  //         skills: ["antani"],
  //       }, function(err, oonitarian){
  //         if (err) {
  //           console.log(err);
  //           console.log(err.details.codes.username);
  //           console.log(err.details.messages.email);
  //         } else {
  //           var ctx = loopback.getCurrentContext();
  //           ctx.set('currentUser', oonitarian)
  //           Team.createJoin(
  //             "Some team name",
  //             "some description",
  //             "some long desc", 
  //             function(err, team) {
  //               if (err) {
  //                 console.log(err);
  //               } else {
  //                 console.log("Created");
  //                 console.log(team);
  //                 console.log(oonitarian.team);
  //               }
  //           });
  //         }
  //       });
  //   });
  });
  
};
