const mongoos = require('mongoose')

const schema = new mongoos.Schema({
    id:{
        type:Number,
        require:true,
        unique:true
    },
    title:{
        type:String,
        require:true

    },
    price:{
        type:Number,
        require:true

    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    rating:{
        rate:{
            type:Number,
            require:true
        },
        count:{
            type:Number,
            require:true
        }

    }
})

const products = mongoos.model('products',schema)

module.exports = products