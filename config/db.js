const Mongoose = require('mongoose')

const ConnectDB = async()=>{
    try{

        const conn = await Mongoose.connect(process.env.MONGODB_URL , {

            useNewUrlParser : true,
            useUnifiedTopology : true
        })

        console.log(`MongoDB Connected: ${conn.connection.host} `);


    }
    catch(error){

        console.log(error)
        process.exit(1)
    }
}

module.exports = ConnectDB



