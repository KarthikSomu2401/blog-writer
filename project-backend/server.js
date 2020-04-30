const express = require("express");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const { uuid } = require("uuidv4");
const bodyParser = require("body-parser");
const envs = require("./configurations");
const db = require("./database");
const MongoDBStore = require("connect-mongodb-session")(session);
const user = require("./routes/user.route");
const article = require("./routes/article.route");
var morgan = require("morgan");
var app = express();
const profile = require('./routes/profile.route');

const dBstore = new MongoDBStore({
  uri: envs.MONGO_URL,
  collection: "sessions",
});

app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads',express.static('public/uploads'));
app.use(
  session({
    key: "user_sid",
    secret: envs.NODE_ENV,
    // genid: (req) => {
    //   return envs.NODE_ENV + uuid();
    // },
    store: dBstore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
    //unset: "destroy",
    //name: "session cookie name",
  })
);

app.use("/users", user);
app.use("/articles", article);
app.use('/profile',profile);

var listener = app.listen(envs.PORT, function () {
  console.log("Listening on port " + listener.address().port);
});
