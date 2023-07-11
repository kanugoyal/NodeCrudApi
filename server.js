const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))
//route

app.get('/',(req,res)=>{
    res.send('Hello Node api')
})

app.get('/blog',(req,res)=>{
    res.send('Hello Blog')
})

//Fetch data from db
app.get('/products',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//Fetch data from db based on Id
app.get('/products/:id', async(req,res)=> {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Save data in a database
app.post('/products',async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error)
    {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Update data ny id in json 
app.put('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: 'cannot find any product with id ${id}'})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Delete a Product
app.delete('/products/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "cannot find any product with this id ${id}"})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.
connect('mongodb+srv://goyalkanu25:kaniqwerty09@cluster0.f6o47nm.mongodb.net/node-Api?retryWrites=true&w=majority')
.then(()=> {
    console.log('connected to MongoDB')
    app.listen(3000,()=>{
        console.log('Node Api app is running on port 3000')
    });
    
}).catch(()=>{
    console.log(error)
})