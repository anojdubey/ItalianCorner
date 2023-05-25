var app = require("express")();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var Schema = mongoose.Schema;
var Razorpay = require("razorpay");

const foodSchema = new Schema({
  title: String,
  type: String,
  image: String,
  cost: Number,
});
const orderSchema = new Schema({
  razorpay_payment_id: String,
  order: Array,
});

mongoose
  .connect(
    "mongodb+srv://anojadubey:cO9btnD4DOG2f1hE@cluster0.mq2izho.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => console.log(err));

const Foods = mongoose.model("Foods", foodSchema);
const Orders = mongoose.model("Orders", orderSchema);

app.use(cors());

app.get("/", function (req, res) {
  Foods.find()
    .then((foods) => {
      if (!foods || foods.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      } else {
        return res.status(200).json({ foods: foods });
      }
    })
    .catch((err) => console.log(err));
});

app.post("/", bodyParser.json(), function (req, res) {
  const food = new Foods({
    title: req.body.title,
    type: req.body.type,
    image: req.body.image,
    cost: req.body.cost,
  });
  food
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Data added successfully",
        result: result,
      });
    })
    .catch((err) => console.log(err));
});
app.get("/orders", function (req, res) {
  Orders.find()
    .then((orders) => {
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      } else {
        return res.status(200).json({ orders: orders });
      }
    })
    .catch((err) => console.log(err));
});

app.post("/orders", bodyParser.json(), function (req, res) {
  const order = new Orders({
    razorpay_payment_id: req.body.razorpay_payment_id,
    order: req.body.order,
  });
  order
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Order added successfully",
        result: result,
      });
    })
    .catch((err) => console.log(err));
});
app.delete("/orders/:id", function (req, res) {
  const id = req.params.id;
  console.log(req);
  Orders.findByIdAndDelete(id)
    .then((result) => {
      res.status(201).json({
        message: "Order deleted successfully",
      });
    })
    .catch((err) => console.log(err));
});

// app.put("/editpost", bodyParser.json(), function (req, res) {
//   const id = req.body.id;
//   const post = Posts.findByIdAndUpdate(id, {
//     title: req.body.title,
//     summary: req.body.summary,
//     author: req.body.author,
//     introduction: req.body.introduction,
//     whynow: req.body.whynow,
//     theplan: req.body.theplan,
//     conclusion: req.body.conclusion,
//   })
//     .then((result) => {
//       res.status(201).json({
//         message: "Post updated successfully",
//       });
//     })
//     .catch((err) => console.log(err));
// });

app.listen(5000, function () {
  console.log("listening on port 5000!");
});
