const express = require('express');
const connectDB = require('./config/db');


const app = express();

//Conectar a la DB
connectDB();


app.use(express.json({extended:false}))


//Definir rutas
app.use('/',require('./routes/index'));
app.use('/api/Url',require('./routes/url'));



const PORT = 5000;

app.listen(PORT,() => console.log(`Server running on port: ${PORT}`));


