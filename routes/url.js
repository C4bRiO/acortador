const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/Url");

//@route POST /api/url/shorten
//@desc Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  let urlBaseInvalida = !validUrl.isUri(baseUrl);

  //corto circuito
  if (urlBaseInvalida) {
    res.status(401).json("URL Base invalida");
  }

  //Crear el codigo de la url
  const urlCode = shortid.generate();
  let urlLargaValida = validUrl.isUri(longUrl);
  //Check long url
  if (urlLargaValida) {
    try {
      //busca la url en la base  
      let url = await Url.findOne({ longUrl });
      
      //si no existe, entonces genera el shortlink y guarda en la db.
      if (!url) {
        const shortUrl = `${baseUrl}/${urlCode}`;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        //Guardar la nueva url
        await url.save();
      }

      //de una u otra forma retorno url.
      //al no llamar al res.status() se asume que el status es 200 = OK
      res.json(url);

    } catch (err) {
      console.error(err);
      res.status(500).json("Server ERROR");
    }
  } else {
    res.status(401).json("URL Invalida");
  }
});

module.exports = router;
