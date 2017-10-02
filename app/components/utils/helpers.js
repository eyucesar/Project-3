// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Helper functions for making API Calls
var helper = {

  // This function hits our own server to retrieve the record of query results
  getStories: function() {
    console.log("here");
    return axios.get("/stories");
  },

  // This function posts new searches to our database.
  postHistory: function(location) {
    return axios.post("/api", { location: location });
  },

  updateHearts(id, hearts) {
    
    console.log("updating " + id +" " + hearts);
    return axios.post("/updateHearts", {id, hearts});
  }


};

// We export the API helper
module.exports = helper;
