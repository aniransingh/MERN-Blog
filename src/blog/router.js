const express = require("express");
const blogRouter = express.Router();

const { isAuthenticated } = require("../helper/utils");
const {createBlog} = require("./controllers")

blogRouter.post("/blogs", isAuthenticated, createBlog);

module.exports = blogRouter;