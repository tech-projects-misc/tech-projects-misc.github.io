const conn = require("../sqlConfig");

exports.register = (req, res, next) => {
    const sql = "INSERT INTO Users (name, email, password) VALUES (?,?,?)";

    const { name, email, password } = req.body;

    conn.query(sql, [name, email, password], (err, result) => {
        if (err)
            console.log(err);
        else if (result) {
            res.status(200).json({
                status: "success",
                message: "User Registered Successfully"
            })
        }
    })
}

exports.login = (req, res, next) => {
    const sql = "SELECT * from Users WHERE email = ? and password = ?";

    const { email, password } = req.body;

    conn.query(sql, [email, password], (err, result) => {
        if (err)
            console.log(err);
        if (result.length == 1) {
            res.status(200).json({
                status: "success",
                message: "User Logged In Successfully"
            })
        }
        if (result.length == 0) {
            res.status(401).json({
                status: "error",
                message: "Invalid Login Credentials."
            })
        }
    })
}

exports.createBlog = (req, res, next) => {
    const sql = "INSERT INTO Blogs (id, imageUrl, blogTitle, blogType, blogDescription) VALUES (?,?,?,?,?)";

    const { id, imageUrl, blogTitle, blogType, blogDescription } = req.body;

    conn.query(sql, [id, imageUrl, blogTitle, blogType, blogDescription], (err, result) => {
        if (err)
            console.log(err)
        if (result) {
            res.status(201).json({
                status: "success",
                message: "Blog Created Successfully"
            })
        }
    })
}

exports.getAllBlogs = (req, res, next) => {
    const sql = "SELECT * FROM Blogs";

    conn.query(sql, (err, result) => {
        if (err)
            console.log(err)
        if (result) {
            res.status(200).json({
                status: "success",
                message: "List of all Blogs",
                data: result
            })
        }
    })
}

exports.deleteBlog = (req, res, next) => {
    const sql = "DELETE from Blogs WHERE id = ?";

    const { id } = req.body;

    conn.query(sql, [id], (err, result) => {
        if (err)
            console.log(err)
        if (result) {
            res.status(200).json({
                status: "success",
                message: "Blog Deleted successfully",
                data: result
            })
        }
    })
}

exports.getBlog = (req, res, next) => {
    const sql = "SELECT * FROM Blogs WHERE id = ?";

    const { id } = req.body;

    conn.query(sql, [id], (err, result) => {
        if (err)
            console.log(err)
        if (result) {
            res.status(200).json({
                status: "success",
                message: "Selected Blog Content",
                data: result
            })
        }
    })
}