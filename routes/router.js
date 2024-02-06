const express = require('express')
const router= new express.Router()
const controller = require('../controller/productcontroller')
const usercontroller=require('../controller/usercontroller')
const wishlistcontroller = require('../controller/wishlistcontroller')
const cartController =require('../controller/cartController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')


// register w post
router.post('/register',usercontroller.registerController)
// login w post
router.post('/login',usercontroller.loginController)

// get all products route

router.get('/all-products',controller.getAllProductsController)

// get a product controller 
router.get('/get-product/:id',controller.getProductController)

// add to wish list

router.post('/add-to-wishlist',jwtMiddleware,wishlistcontroller.addTowishlist)



// get from wishlist

router.get('/getFromWishlist',jwtMiddleware,wishlistcontroller.getFromWishlistController)

// remove from wishlist
router.delete('/remove/:id',jwtMiddleware,wishlistcontroller.deleteFromWishlistController)


// add to cart
router.post('/add-to-cart',jwtMiddleware,cartController.addToCartController)


// get to cart

router.get('/getcart',jwtMiddleware,cartController.getFromCartController)

// remove from cart

router.delete('/remove/cartItem/:id',jwtMiddleware,cartController.removeFromCartController)

// increment
router.get('/cart/increment/:id',jwtMiddleware,cartController.incrementItemController)

// decrement
router.get('/cart/decrement/:id',jwtMiddleware,cartController.decrementItemController)

// empty cart

router.delete('/emptycart',jwtMiddleware,cartController.emptycartController)

module.exports=router
