const mongoos = require('mongoose')

connection_string = process.env.CONNECTION_STRING

mongoos.connect(connection_string).then((res)=>{
    console.log(`mongoDb connected!`);
}).catch((err)=>{
    console.log(err);
})

