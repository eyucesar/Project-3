var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
  	type: String,
  	required: true
  },
  picUrl: {
    type: String,
    required: true
  },
  email: {
  	type: String,
  	required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  story: {
  	type: Schema.Types.ObjectId,
  	ref: "Story"
  }
});

var User = mongoose.model("User", UserSchema);
module.exports = User;