import express from 'express'
import mongoose from 'mongoose'
const app = express()
const port = 3000 
app.use(express.json())

const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    password:String,
    age:Number,
    isMarried:Boolean,
})

const usersModel =  mongoose.model("user",usersSchema)

app.get("/",async(req,res)=>{
    try {
        const users =await usersModel.find({})
        res.send(users)
    } catch (error) {
        res.send("")
    }
})

app.get("/:id" ,async (req,res)=>{
    const {id}=req.params
    const users = await usersModel.findById(id)
    res.send(users)
 
})

app.post("/",async (req,res)=>{
    try {
        const{username ,email ,password ,age ,isMarried} =req.body
        const newUser = new usersModel({username ,email ,password ,age ,isMarried})
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        res.send(error.message)
    } 
})

app.put("/:id",async (req,res)=>{
    const {id}=req.params
    const{username ,email ,password ,age ,isMarried} =req.body
    const users = await usersModel.findByIdAndUpdate(id,{username ,email ,password ,age ,isMarried})
    res.send(users)
})  

app.delete("/:id",async (req,res)=>{
    const {id}=req.params
    const users = await usersModel.findByIdAndDelete(id)
    res.send("data is deleted")
})
mongoose.connect('mongodb+srv://anar:anar@cluster0.aeurkzy.mongodb.net/')
.then(() => console.log('Connected!')) 
.catch(()=>console.error("Not connected!"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })