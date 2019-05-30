let express = require("express");
let multer = require("multer");
let cors = require("cors");
let upload = multer({ dest: __dirname + "/uploads/" });
let app = express();
let cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
let sessions = {};
let passwords = {};
let stripe = require("stripe")("pk_test_18GnVPYwKXom1VEc1NhhvGNC00AF7EI0GC");
let MongoClient = require("mongodb").MongoClient;
let url =
  "mongodb+srv://AlexAdmin:alibay@alibaydb-4yk4b.mongodb.net/test?retryWrites=true";
let dbs = undefined;
let db = undefined;
MongoClient.connect(url, { useNewUrlParser: true }, (err, allDbs) => {
  if (err) throw err;
  dbs = allDbs;
  db = dbs.db("AlibayPets");
});

let generateId = () => {
  return "" + Math.floor(Math.random() * 1000000);
};

//***************************************************************************************************/

app.get("/logout", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  db.collection("sessions").deleteOne({ sessionId: sessionId });
  res.send(JSON.stringify({ success: true }));
  return;
});

//***************************************************************************************************/

app.get("/allItems", upload.none(), (req, res) => {
  db.collection("items")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.send(JSON.stringify({ success: true, items: result }));
    });
});

//***************************************************************************************************/

app.post("/signup", upload.none(), (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  db.collection("sellers")
    .findOne({ username: username })
    .then(user => {
      if (user !== null) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      db.collection("sellers").insertOne(
        { username: username, password: password },
        (err, result) => {
          if (err) throw err;
          let sessionId = generateId();
          res.cookie("sid", sessionId);
          db.collection("sessions").insertOne(
            { sessionId: sessionId, username: username },
            (err, result) => {
              if (err) throw err;
            }
          );
          res.send(JSON.stringify({ success: true }));
        }
      );
    });
});

//***************************************************************************************************/

app.post("/login", upload.none(), (req, res) => {
  let username = req.body.username;
  let enteredPassword = req.body.password;
  db.collection("sellers")
    .findOne({ username: username })
    .then(user => {
      let expectedPassword = user.password;
      if (enteredPassword !== expectedPassword) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      let sessionId = generateId();
      res.cookie("sid", sessionId);
      db.collection("sessions").insertOne(
        { sessionId: sessionId, username: username },
        (err, result) => {
          if (err) throw err;
          res.send(JSON.stringify({ success: true }));
        }
      );
    });
});

app.get("/autoLogin", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  db.collection("sessions")
    .findOne({ sessionId: sessionId })
    .then(user => {
      if (sessionId !== undefined) {
        res.send(JSON.stringify({ success: true, username: user.username }));
        return;
      }
      res.send(JSON.stringify({ success: false }));
    });
});

//***************************************************************************************************/

app.post("/searchItem", upload.none(), (req, res) => {
  let search = req.body.search;
  let regexSearch = new RegExp(search);
  db.collection("items")
    .find({
      $or: [
        { description: { $regex: regexSearch } },
        { name: { $regex: regexSearch } }
      ]
    })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(JSON.stringify({ success: true, items: result }));
    });
});

//***************************************************************************************************/

app.post("/sellItems", upload.single("item-image"), (req, res) => {
  console.log("hi im in the endpoint", req.body);
  let sessionId = req.cookies.sid;
  db.collection("sessions")
    .findOne({ sessionId: sessionId })
    .then(user => {
      let username = user.username;
      db.collection("sellers")
        .findOne({ username: username })
        .then(item => {
          let itemName = req.body.name;
          let itemDescription = req.body.description;
          let itemPrice = req.body.price;
          let itemImage = req.file;
          let imagePath = itemImage.filename;
          let itemId = req.body.itemId;
          let itemCategory = req.body.category;
          let itemStock = req.body.stock;

          db.collection("items").insertOne(
            {
              name: itemName,
              id: itemId,
              seller: username,
              description: itemDescription,
              price: itemPrice,
              image: imagePath,
              category: itemCategory,
              stock: itemStock
            },
            (err, result) => {
              if (err) throw err;
              res.send(JSON.stringify({ success: true }));
            }
          );
        });
    });
});

//***************************************************************************************************/

app.post("/newReview", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  db.collection("sessions")
    .findOne({ sessionId: sessionId })
    .then(user => {
      let username = user.username;
      db.collection("sellers")
        .findOne({ username: username })
        .then(newItem => {
          let newReviewItemId = req.body.itemId;
          let newReviewTitle = req.body.title;
          let newReviewRating = req.body.rating;
          let newReviewDesc = req.review.description;

          db.collection("sellers").insertOne(
            {
              userId: newReviewId,
              username: username,
              id: newReviewItemId,
              title: newReviewTitle,
              rating: newReviewRating,
              description: newReviewDesc
            },
            (err, result) => {
              if (err) throw err;
              res.send(JSON.stringify({ success: true }));
            }
          );
        });
    });
});

//***************************************************************************************************/

app.post("/save-stripe-token", upload.none(), (req, res) => {
  let token = req.body.stripeToken;
  let price = req.body.amount;
  stripe.charges.create({
    amount: price,
    currency: "CAD",
    description: "",
    source: token
  });
});

//***************************************************************************************************/

app.use("/images", express.static(__dirname + "/uploads/"));
console.log(__dirname);
//LOCAL SERVER
app.listen(4000, () => {
  console.log("Running on port 4000");
});
