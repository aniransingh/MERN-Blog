const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
    {
        title: String,
        description: String,
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        details: String
    },
    { timestamps: true }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
