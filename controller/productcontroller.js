const products = require('../Model/itemModel')

// get all products fromm database

exports.getAllProductsController = async(req,res)=>{
    try {
        const allProducts =await products.find()
        res.status(200).json(allProducts)
        
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.getProductController = async(req,res)=>{
    const {id} = req.params
    console.log(id);
    try {
        const product = await products.find({id})
        res.status(200).json(product)
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}