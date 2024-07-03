const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const Post = require("./models/post");

//destination to store the uploaded files
const uploadedFile = multer({ dest: "uploads/" });

const app = express();
// //making uploads public
app.use("/uploads", express.static(__dirname + "/uploads"));

const db =
  "mongodb+srv://dikshya:blog123@blog.i4viai3.mongodb.net/Blogdata?retryWrites=true&w=majority&appName=blog";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db connected");
    app.listen(2024, () => console.log("Server running on port 2024"));
  })
  .catch((err) => console.log(err));

//middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);
const secret = "wereew";

// Registration endpoint
app.post("/register", async (req, res) => {
  try {
    const { firstname, middlename, lastname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user with the hashed password
    const newUser = new User({
      firstname,
      middlename,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(newUser);
    // alert("User registered successfully");
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Occurred" });
  }
});
//login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  console.log(password);
  const passOk = bcrypt.compareSync(password, userDoc.password);
  console.log(passOk);

  if (passOk) {
    //login
    //created the JWT token using jwt.sign
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({ id: userDoc._id, email });
      // res.json({ token });
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

//profile endpoint
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json(req.cookies);
});

// //logout endpoint
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logout");
});

//create post endpoint
app.post("/post", uploadedFile.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = new Post({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    await postDoc.save();

    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["firstname"])
      .sort({ createdAt: -1 })
      .limit(10)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["firstname"]);
  res.json(postDoc);
});
