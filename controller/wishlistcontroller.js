const wishlists = require('../Model/wishlistModel')

exports.addTowishlist = async (req,res)=>{
    // First get items for the operation
    const {id, title, price, description, category, image,rating} = req.body
    const userId = req.payload
    // to see user id console it 
    console.log(userId);

    try {
        const existingProduct= await wishlists.findOne({id,userId})
        if(existingProduct){
            res.status(406).json('item already added to wishlist!')
        }else{
            const newProduct = new wishlists({
                id, title, price, description, category, image,rating,userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
        
    }
}


exports.getFromWishlistController = async(req,res)=>{

    const userId = req.payload

    try {
        const allProduct = await wishlists.find({userId})
        res.status(200).json(allProduct)
    } catch (error) {
        res.status(401).json(error)
        
    }

}

exports.deleteFromWishlistController = async(req,res)=>{

    const {id} =req.params
    console.log(id);

    try {
        const removeItem = await wishlists.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
        
    }

}