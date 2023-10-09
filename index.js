const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose")
const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/users.js")
const postRoute = require("./routes/posts.js")
const categoryRoute = require("./routes/category.js")
const multer = require("multer");
const cors = require('cors')
const path = require('path');

require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_DB)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute) 
app.use("/api/posts", postRoute)
app.use("/api/category", categoryRoute)

app.listen(port, () => {
    console.log(`Backend is runnging on http://localhost:${port}`);
})