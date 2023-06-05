const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const { register, login, createBlog, getAllBlogs, getBlog, deleteBlog } = require("./controllers");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/createBlog", createBlog);
app.get("/api/getAllBlogs", getAllBlogs);
app.post("/api/getBlog", getBlog);
app.delete("/api/deleteBlog", deleteBlog);

app.listen(4000, () => {
    console.log(`App running on port 4000 ...`);
});