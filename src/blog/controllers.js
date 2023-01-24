const Blog = require("../blog/models");

const createBlog = async (req, res) => {
    const { title, description } = req.body;

    const blog = await Blog.create({ title, description });
    const allBlogs = await Blog.find().populate("user_id details");

    return res.status(201).json({ msg: "blog created", allBlogs });
};

module.exports = {
    createBlog,
};
