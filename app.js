const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');


const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
const dburi = "mongodb+srv://neel:neel007@node.tflje.mongodb.net/node?retryWrites=true&w=majority";
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log('not connected'));

mongoose.set('useFindAndModify',false);

app.get("/", (req, res) => {
    res.end("welcome");
});


app.post("/adduser", (req, res) =>{
    const users = new User({
        username: req.body.username,
        email: req.body.email,
        password:req.body.password,
        mo_no: req.body.mo_no,
        role: req.body.role
    });
    console.log(req.body.username);
    users.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) =>{
            console.log('error');
        });
});

app.post("/login", (req, res) =>{
    
  User.exists({username:req.body.username, password: req.body.password},(err, result) =>{
      if(err){
          console.log('error');
          res.send(err);
      }
      else{
          if(result == true){
            res.send('login successfully');
          }
          else{
            res.send('login not successfully');
          }
          
      }
  })
});




app.post("/addproduct", (req, res) =>{

    //if(User.role == 'admin'){
        const product = new Product({
            productname: req.body.productname,
            discription: req.body.discription,
            price:req.body.price
        });
        product.save()
            .then((result) => {
                res.send(result);
            })
            .catch((err) =>{
                console.log('error');
            });
    //}
  //  else{
   //     res.send('Only admin can access...');
   // }
   
});


app.post("/orderproduct/:id", (req, res) =>{

    let id = req.params.id;

    Product.findById(id)
        .then((result) => {
            const order = new Order({
                details: result
            });
            order.save()
                .then((result) => {
                    res.send('Order Successfully');
                })
                .catch((err) =>{
                    console.log('error');
                });
        })
        .catch((err) => console.log('error'));
    
});


app.get("/getproduct", (req, res) =>{
    Product.find().sort( { createdAt: -1 } )
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log('error'));
});


app.get("/getproduct/:id", (req, res) =>{
    Product.findById(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log('error'));
});

app.get("/vieworder", (req, res) =>{
    Order.find().sort( { createdAt: -1 } )
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log('error'));
});



app.listen(port,(err) =>{
    console.log("listing on port no.",port);
});