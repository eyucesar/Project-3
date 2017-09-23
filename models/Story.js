var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StorySchema = new Schema({
	postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	date: {
	type: Date,
	default: Date.now()
	},
	hearts: {
	type: Number,
	default: 0
	},
	flags: {
	type: Number,
	default: 0
	},
	shortVersion: {
		type: String
	},
	longVersion: {
		type: String
	}
});

var Story = mongoose.model("Story", StorySchema);
module.exports = Story;