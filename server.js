const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5000
const connectdb = require ('./config/db')

require('dotenv').config()

connectdb()

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        uppercase: true,
        required: true,
    },
    age:{
        type: Number,
    },
    favoriteFoods:{
        type:[String],
    }
});

const Person = mongoose.model("Person", personSchema)

const User = new Person({
    name: "Joey",
    age:"28",
    favoriteFoods: ["Lasagnes", "Pizza"]
});

const users= [
    {
    name: "Djo",
    age:"30",
    favoriteFoods: ["Sandwich", "Cannelloni"]
    }, 
    {
    name: "Elven",
    age:"35",
    favoriteFoods: ["Pasta", "Paella"]
    },
    {
    name: "Elena",
    age:"33",
    favoriteFoods: ["Chicken", "Tapas"]
    }
]

User.save((error)=>{
    error ? console.log("Save:" ,error) :
    console.log("User successfully added")
});

Person.create(users, (error, res) => {
    error ? console.log("Create:" ,error) :
    console.log(res)
})
Person.find({name:"ELven"},(error, res) =>{
    error ? console.log("Find By Name:" ,error) :
    console.log("Find By Name:", res)
});
Person.findOne({favoriteFoods:"Chicken"}, (error, res) =>{
    error ? console.log("Find One:" ,error) :
    console.log("Find One:", res)
});
Person.findById({_id:"614e66b8ecf5fbd8c6c54768"},(error, res) =>{
    error ? console.log("Find By ID:" ,error) :
    console.log("Find By ID", res)
});
Person.findById({_id:"614e6b8b0479d4c46f42c0f0"}, async(error, res) =>{
    try{
        await res.favoriteFoods.push("Couscous")
        console.log("Favorite Foods was updated")
        res.save()
    }catch(error){
        console.log("Error", error)
    }
});
Person.findOneAndUpdate({name:"Elena"}, {$set:{age:20}} ,(error, res) =>{
    error ? console.log("Age :" ,error) :
    console.log("Age Updated")
});
Person.findByIdAndRemove({_id:"614e6ca1c6868b3c3f8d7298"}, (error, res) =>{
    error ? console.log("Remove:" ,error) :
    console.log("User Deleted")
});
Person.remove({name:"Mary"}, (error, res) =>{
    error ? console.log("Remove:" ,error) :
    console.log("User Mary was Deleted")
});
Person.find({favoriteFoods:"burritos"})
      .sort({name:1})
      .limit(2)
      .select({age:0})
      .exec((error,res)=>{
        error ? console.log(error):
        console.log("People who like Burritos", res)
      })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});