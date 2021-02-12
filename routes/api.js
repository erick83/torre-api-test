var express = require('express');
var got = require('got');
var router = express.Router();

/* GET users listing. */
router.get('/bios/:user', async function(req, res, next) {
  const { params } = req
  console.log('Params', params)
  try {
    const response = await got.get(`https://torre.bio/api/bios/${params.user}`);
    console.log(response)
    res.json(response.body);
  } catch (error) {
    var errorNumber = error.number || parseInt(error.message.match(/\d{3}/g))
    console.log(errorNumber)
    res.status(errorNumber).json({ message: error.message })
  }
});

module.exports = router;
