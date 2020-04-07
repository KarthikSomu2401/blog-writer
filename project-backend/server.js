const express = require("express");
const session = require("express-session");
const cors = require("cors");
//const uuid = require("uuidv4");
const bodyParser = require("body-parser");
const envs = require("./configurations");
const db = require("./database");
const MongoDBStore = require("connect-mongodb-session")(session);
const user = require("./routes/user.route");
var app = express();

/* const store = new MongoDBStore({
  uri: envs.MONGO_URL,
  collection: "sessions",
}); */

app.use(cors());
app.use(
  session({
    secret: envs.NODE_ENV,
    /* genid: (req) => {
      return uuid();
    }, */
    store: store,
    resave: false,
    saveUninitialized: true,
    unset: "destroy",
    expires: new Date(Date.now() + 900000),
    name: "session cookie name",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", user);

var listener = app.listen(envs.PORT, function () {
  console.log("Listening on port " + listener.address().port);
  console.log(new Date(Date.now() + 900000));
});
