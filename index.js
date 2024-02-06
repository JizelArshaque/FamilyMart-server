require('dotenv').config()

const express = require('express')

const cors = require('cors')

require('./itemDB/connection')

const routes = require('./routes/router')

const familyMartServer= express()

familyMartServer.use(cors())

familyMartServer.use(express.json())

familyMartServer.use(routes)

const PORT = 8008 || process.env.PORT

familyMartServer.listen(PORT,()=>{
    console.log(`Server Running @ ${PORT}`);
})

familyMartServer.get('/',(req,res)=>{
    res.send('Light Weight!')
})



