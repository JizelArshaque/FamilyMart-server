const cartmodel = require('../Model/cartModel')


exports.addToCartController = async(req,res)=>{
    // First get items for the operation
    const userId = req.payload
    const {id, title, price, description, category, image, rating, quantity} = req.body

    try {
        const existingProduct = await cartmodel.findOne({id,userId})

        if(existingProduct){
            existingProduct.quantity += 1

            existingProduct.grandtotal = existingProduct.quantity * existingProduct.price
            await existingProduct.save()
            res.status(200).json('item incremnted')

        }else{
            const newProduct = new cartmodel({
                id, title, price, description, category, image,rating,quantity,grandtotal:price,userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
            

        }
        
    } catch (error) {

        res.status(401).json(error)
        
    }
    

}


exports.getFromCartController = async(req,res)=>{
    const userId = req.payload

    try {
        const allProduct = await cartmodel.find({userId})
        res.status(200).json(allProduct)
        
    } catch (error) {
        res.status(401).json(error)
        
    }

}

exports.removeFromCartController = async (req,res)=>{
    const {id} = req.params

    try {
        await cartmodel.deleteOne({_id:id})
        res.status(200).json('item removed from cart')
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
        
    }
}

// increment item

exports.incrementItemController = async(req,res)=>{
    const {id} = req.params
    try {
        const selectedItem = await cartmodel.findOne({_id:id})

        if(selectedItem){
            selectedItem.quantity+=1
            selectedItem.grandtotal=selectedItem.price*selectedItem.quantity
            await selectedItem.save()
            res.status(200).json('item quantity incremented')  
        }else{
            res.status(406).json('no such item available!!!')
        }
    } catch (error) {
        console.log(error);
        res.status(406).json(error)
        
    }
}



// decrement item

exports.decrementItemController = async(req,res)=>{
const {id} = req.params
try {
    const selectedItem = await cartmodel.findOne({_id:id})

    if(selectedItem){
        selectedItem.quantity-=1
        if(selectedItem.quantity==0){
            await cartmodel.deleteOne({_id:id})
            res.status(200).json('item deleted from cart')     
        }else{
            selectedItem.grandtotal=selectedItem.price*selectedItem.quantity
            await selectedItem.save()
            res.status(200).json(selectedItem)      
            }
    }else{
        res.status(406).json('no such item available!!!')
    }
} catch (error) {
    console.log(error);
    res.status(406).json(error)
    
}
}

// empty cart controller

exports.emptycartController =async(req,res)=>{
    const userId = req.payload
    try {
        await cartmodel.deleteMany({userId})
        res.status(200).json('cart emptied!')   
    } catch (error) {
        console.log(error);
        res.status(407).json(error)
        
    }
}