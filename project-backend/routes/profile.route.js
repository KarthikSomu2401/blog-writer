const express = require("express");
const router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!
const profile_controller = require("../controllers/profile.controller");
/* const multer = require('multer');
//const util = require('util');
//const GridFsStorage = require('multer-gridfs-storage');

const storage = multer.diskStorage({
  destination : function(req, file, cb) {
    cb(null,'./public/uploads/');
  },
  filename: function (req,file,cb) {
    cb(null, new Date().toISOString()+ file.originalname);
  }
})

const fileFilter = (req, file, cb) =>{
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
    cb(null,true);
  }else{
  //reject file
  cb(null,false);
}
}
const upload = multer({storage : storage,
limits:{
fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
})
  */
/* var storage =  new GridFsStorage({
url: "mongodb+srv://cs615:cs615@cs615-wqbam.mongodb.net/cs615",
options : { useNewUrlParser: true, useUnifiedTopology : true},
file: (req,file) =>{
const match = ["image/png","image/jpeg"];

if(match.indexOf(file.mimetype)=== -1){
  const filename = `${Date.now()}-profile-${file.originalname}`;
  return filename;
}

return{
  bucketName : "photos",
  filename: `${Date.now()}-profile-${file.originalname}`
};
}
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
 */
var sessionChecker = (req, res, next) => {
  if (!req.cookies.emailId) {
    res.status(404).redirect("/sign-in");
  }
  next();
};

router.get("/displayprofile", profile_controller.display_profile);
router.post(
  "/editprofile/:id",
  /* uploadFilesMiddleware */ /* upload.single('image') */ profile_controller.edit_profile
);
//router.get("/test", profile_controller.test);
module.exports = router;
