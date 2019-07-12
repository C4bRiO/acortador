const mongoose = require('mongoose');
const config = require('config');

//Obtener la vaiable de entorno configurada en el default.json/production.json
const db = config.get('mongoURI');

const connectDB = async () =>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true
        });

        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(err.message);
        //exit with error 
        process.exit(1);
    }
};


module.exports = connectDB;