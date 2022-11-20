import  express  from "express";
import mongoose from "mongoose";

import Cards from './dbCards.js';
import Cors from 'cors';

//App config
const app=express()
const port=process.env.PORT || 8001

// middlewares
app.use(express.json());
app.use(Cors());

// DB config
// admin12345

const uri ="mongodb+srv://admin:Ankush1234@cluster0.exbhg94.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
});


// API endpoints
app.get("/",(req,res)=>res.status(200).send("Hello World"))
app.post("/tinder/cards", (req, res) => {
  // Trying for getting the cards'
const dbCard=req.body;
  Cards.create(dbCard,(err, data) => {
    if (err) {
      res.status(500).json({ err: err.message });
    } else {
      res.status(201).json(data);
    }
  });
});


app.get("/tinder/cards",  (req, res) => {
 
    // Trying for getting the cards
    Cards.find((err,data)=>{
      if(err){
      res.status(500).json({ err: err.message });
      }else{
        res.status(200).send(data);
      }
    }) 
})

// Listner 
app.listen(port, () => console.log(`listening on port${port}`));

