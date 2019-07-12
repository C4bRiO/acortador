const express = require('express');
const router = express.Router();

const Url = require('../models/Url');


//Crear la ruta
//@route GET /:codigo
//@desc Redireccionar al link original
router.get('/:code',async (req,res) =>{
    try {
        const url = await Url.findOne({urlCode: req.params.code});

        if(url){
            res.redirect(url.longUrl);
        }else{
            res.status(404).json('URL No encontrada');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error interno del Servidor');
    }
});



module.exports = router;