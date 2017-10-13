// include the axios package for performing HTTP requests
var axios = require("axios");
// helper functions for making API calls
var helper = {
  // retrieve the stories from DB
  getStories: function() {
    console.log("here");
    return axios.get("/stories");
  },
  // post the heart count
  updateHearts(id, hearts) {
   console.log("updating " + id +" " + hearts);
   return axios.post("/updateHearts", {id, hearts});
  },
  // post the flag count
  updateFlags(id, flags) {
   console.log("updating " + id +" " + flags);
   return axios.post("/updateFlags", {id, flags});
  }
};

// export the helper functions
module.exports = helper;