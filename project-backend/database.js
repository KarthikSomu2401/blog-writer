let mongoose = require("mongoose");
const envs = require("./configurations");

/* const crypto = require("crypto");
const path = require("path");
//const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
 */

mongoose.connect(`${envs.MONGO_URL}`, {
  useCreateIndex: true,
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
  console.log("Connection Succeeded.");
});

/* let gfs;
db.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: "uploads"
  });
});

/* const storage = new GridFsStorage({
  url: envs.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
}); */

/* const storage = new GridFsStorage({ url : envs.MONGO_URL})

const upload = multer({
  storage
});  */

module.exports = db;
