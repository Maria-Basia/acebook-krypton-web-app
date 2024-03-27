const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  liked: { type: Boolean, default: false },
  likeCounter: { type: Number, default: 0 },
  image: {type: String},
  timeStamps:{type: Date, default:Date.now},
});

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
const dateTimeString = new Date().toLocaleString("en-GB");
new Post({ username:'Ben',
          message: 'update model post',
          liked: true,
          likeCounter: 1
          }).save();

module.exports = Post;
