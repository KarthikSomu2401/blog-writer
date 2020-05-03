const express = require("express");
const router = express.Router();
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
var uploadFilesMiddleware = util.promisify(uploadFile); */

var sessionChecker = (req, res, next) => {
  if (!req.cookies.emailId) {
    res.status(404).redirect("/sign-in");
  }
  next();
};

/**
 * @swagger
 * definitions:
 *   Tags:
 *     properties:
 *       label:
 *         type: string
 *       value:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Profile:
 *     properties:
 *       fullName:
 *         type: string
 *       birthday:
 *         type: string
 *       city:
 *         type: string
 *       occupation:
 *         type: string
 *       bio:
 *         type: string
 *       interests:
 *         type: array
 *         items:
 *            $ref: '#definitions/Tags'
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       emailId:
 *         type: string
 *       password:
 *         type: string
 *       profile:
 *           $ref: '#/definitions/Profile'
 */

/**
 * @swagger
 * /profile/displayprofile:
 *   get:
 *     tags:
 *       - User
 *     description: Returns the details of current user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns the details of current user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get("/displayprofile", profile_controller.display_profile);

/**
 * @swagger
 * /profile/editprofile/{id}:
 *   post:
 *     tags:
 *       - User
 *     description: Returns the details of current user
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *       - name: user
 *         required: true
 *         paramType: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post(
  "/editprofile/:id",
  /* uploadFilesMiddleware */ /* upload.single('image') */ profile_controller.edit_profile
);
//router.get("/test", profile_controller.test);
module.exports = router;
