const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const mongoose = require('mongoose')
const server = 'fsd-server-admin:fsdadmin1@ds151232.mlab.com:51232'
const database = 'my-shelf'
mongoose.connect(`mongodb://${server}/${database}`).then(console.log('database connected'))
const Schema = mongoose.Schema
const product = new Schema({
    product_id: String,
    product_name: String,
    product_price: Number,
    product_units: Number
})
const productS = mongoose.model('Products', product)
app.get('/', (req, res)=>{
    productS.find({}, (err, data)=>{
        res.status(200).json({'message':'products', 'data': data})
    }) 
})
app.post('/', (req, res)=>{
    let prod = new productS({
        product_id: req.body.id,
        product_name: req.body.name,
        product_price: req.body.price,
        product_units: req.body.units
    })
    prod.save((err, data)=>{
        if(err)
            console.log(err)
        res.status(200).json({'message':'product added successfully', 'data': data})
    })
})
app.get('/:id', (req, res)=>{
    productS.findById(req.param.id, (err, data)=>{
        if(!data)
            res.status(404).json({'message':'product not found'})
        res.status(200).json({'message':'product', 'data':data})
    })
})
app.delete('/:id', (req, res)=>{
    productS.findByIdAndRemove(req.param.id, (err, data)=>{
        if(!data)
            res.status(404).json({'message':'product not found'})
        res.status(200).json({'message':'product deleted', 'data':data})
    })
})
app.listen(3001, (err) => {
    if(err)
        console.log(err)
    console.log('app running')
})