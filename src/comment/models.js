const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        description: String,
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        blog_id: {
            type: Schema.Types.ObjectId,
            ref: "Blog"
        }
    },
    { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
