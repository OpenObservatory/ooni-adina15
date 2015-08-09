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
        shortDescription: "Automatically generate monthly censorship reports for a given country.",
        longDescription: "Automatically generate monthly reports on censorship worldwide with comparisons to the previous months. The output of this is a PDF or static HTML report containing visualisations and generated natural language that clearly explains to the reader any shifts in trends with censorship on an AS, country or global level. These reports may be read by activists, journalists or researchers to become aware of any new developing problems with censorship. This may only include a subset of the OONI tests for the prototype, but should be easily expandable in the future. For the hackfest, three months of reports are produced by ignoring the data from months after the date of the report.",
        membersMaximum: 10        
      };
      
      project2 = {
        name: "World Censorship Map",
        shortDescription: "Automatically generate choropleth maps for visually ranking and comparing reports at a country level.",
        longDescription: "Automatically generate choropleth maps for visually ranking and comparing reports at a country level for metrics such as numbers of reports, most recent reporting country, and incidence of censorship or interference. These maps are a familiar representation that contextualizes global censorship for a wide audience of readers.",
        membersMaximum: 10        
      };

      project3 = {
        name: "OONI Data Metrics",
        shortDescription: "Generate graphs for reporting metadata such as number of reports received in total, per time interval, amount of storage used etc.",
        longDescription: "Generate graphs for reporting metadata such as number of reports received in total, per time interval, amount of storage or resources used, and most reported or under-reported ISPs.",
        membersMaximum: 10        
      };

      project4 = {
        name: "Data API design",
        shortDescription: "Redesign the OONI API (current alpha website) to provide meaningful visualizations per country regarding censorship events and network anomalies.",
        longDescription: "Redesign the OONI API (current alpha website) to provide meaningful visualizations per country regarding censorship events and network anomalies. The current version of the OONI API website is available at <http://api.ooni.io/> while the sources are available at <https://github.com/TheTorProject/ooni-api>.",
        membersMaximum: 10        
      };
      
      project5 = {
        name: "Network Meter",
        shortDescription: "Design the graphical user interface (GUI) for the network meter frontend to network measurement tools.",
        longDescription: "Network Meter is a graphical front-end based on node.js and Electron, currently in early development. It aspires to be a GUI for OONI and other network tools and aims to make running networking diagnostic tests easier for average users. Help design the user interface for Network Meter in general or help with the output presentation for OONI plugin specifically. Network Meter sources are available at <https://github.com/measurement-kit/network-meter>.",
        membersMaximum: 10        
      };

      Team.create(project1);
      Team.create(project2);
      Team.create(project3);
      Team.create(project4);
      Team.create(project5);
    });

  });
  
};
