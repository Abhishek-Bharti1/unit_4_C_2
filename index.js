const express = require("express");

const mongoose = require("mongoose");


const app = express();
const connect = ()=>{
    return("mongodb+srv://abhishek3214:12345@cluster1.3lxvc.mongodb.net/Cluster1?retryWrites=true&w=majority");
}

//user --->
const userSchema = new mongoose.Schema({
    firstName: {type: String , required: true},
    middleName: {type: String,required: false},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String , required: true},
    address: {type: String, required: true},
    gender: {type: String, required: false},
    type: {type: String, required: false}, 
    
},{
versionKey: false,
timestamps: true,
});

const User = mongoose.model("user",userSchema);

//branch Schema
const branchSchema = new mongoose.Schema({
name: {type: String , required: true},
address: {type: String , required: true},
IFSC : {type: String , required: true},
MICR : {type: Number, required: true},


},{
   versionKey: false,
   timestamps: true,
})

const Branch = mongoose.model("branch",branchSchema);




//master-->

const masterSchema = new mongoose.Schema({
    balance: {type: String, required: true},
},{
    versionKey: false,
    timestamps: true,
});
const Master = mongoose.model("master",masterSchema);

//saving ------->
const savingSchema = new mongoose.Schema({
    accountNumber: {type: Number , required: true,unique: true},
    balance: {type: Number, required: true},
    interestRate:{type:Number, required: true},

},{
    versionKey: false,
    timestamps: true,
});
const Saving = mongoose.model("saving",savingSchema);

// fixed---->
const fixedSchema =  new mongoose.Schema({
    accountNumber: {type: Number , required: true},
    balance: {type: Number, required: true},
    interestRate:{type:Number, required: true},
    startDate: {type: String, required: true},
    maturityDate: {type: String, required: true},

},{
    versionKey: false,
    timestamps: true,
});
const Fixed = mongoose.model("fixed",fixedSchema);


//get master------>
app.get("/master",async(req,res)=>{
try{
const master = await Master.find().leaan().exec();
return res.status(200).send(master);``
}catch(err){
    return res
    .status(500)
.send({message:"Something Went Wrong....."});
}
})

//get saaving---->
app.get("/saving",async(req,res)=>{
    try{
    const saving = await Saving.create(req.body);
    return res.status(200).send(saving                                                                                                                                                                                                              );``
    }catch(err){
        return res
        .status(500)
    .send({message:"Something Went Wrong....."});
    }
    })







app.listen(5000,async()=>{
    try{
       await connect();
    }catch(err){
    console.log('err:', err);

    }
console.log("listening to port 5000");
});