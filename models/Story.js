var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StorySchema = new Schema({
  user: {
    type: String
  },
  story: {
  	type:String
  },
  date: {
    type: Date
  }
});

var Story = mongoose.model("Story", StorySchema);
module.exports = Story;
