const express = require('express')
const cors=require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//database connection


const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });


//post
// app.post('/addFoods',(req,res)=>{
//     const foods=req.body;
//     // client = new MongoClient(uri, { useNewUrlParser: true });
//     client.connect(err => {
//         const collection = client.db("redOnion").collection("foods");
      
//         collection.insert(foods,(err,res)=>{
//             console.log('successfully inserted')
//         })
        
//         client.close();
//       });
// })
app.post('/placeOrder',(req,res)=>{
    const orderDetails=req.body;
    orderDetails.orderTime=new Date();
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("orders");
      
        collection.insertOne(orderDetails,(err,result)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }else{
                res.send(result.ops[0]); 
            }
        });
        
        client.close();
      });
});
app.get('/foods',(req,res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true});
    client.connect(err => {
        const collection = client.db("redOnion").collection("foods");
      
        collection.find().toArray((err,documents)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(documents)
            }
        })
        
        client.close();
      });
})

app.get('/foods/:id',(req,res)=>{
    const id= req.params.id;
    client = new MongoClient(uri, { useNewUrlParser: true});
    client.connect(err => {
        const collection = client.db("redOnion").collection("foods");
      
        collection.find({id}).toArray((err,documents)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(documents)
            }
        })
        
        client.close();
      });
});

const port=process.env.PORT || 4000;
app.listen(port,()=>console.log('listening to port 3000'));