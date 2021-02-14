var express = require('express');
var got = require('got');
var router = express.Router();

router.get('/bios/:user', async function(req, res, next) {
  const { params } = req

  try {
    const response = await got.get(`https://torre.bio/api/bios/${params.user}`,);
    res.json(JSON.parse(response.body));
  } catch (error) {
    var errorNumber = getErrorCode(error)
    res.status(errorNumber).json({ message: error.message })
  }
});


router.get('/opportunities/:id', async function(req, res, next) {
  const { params } = req;

  try {
    const response = await got.get(`https://torre.co/api/opportunities/${params.id}`);
    res.json(JSON.parse(response.body));
  } catch (error) {
    var errorNumber = getErrorCode(error);
    res.status(errorNumber).json({ message: error.message });
  }
});


router.post('/opportunities', async function(req, res, next) {
  const { query, body } = req;
  const requestParams = {
    searchParams: query,
    json: body,
    responseType: 'json'
  };

  try {
    const response = await got.post('https://search.torre.co/opportunities/_search/', requestParams)
    res.json(response.body);
  } catch (error) {
    var errorNumber = getErrorCode(error);
    res.status(errorNumber).json({ message: error.message });
  }
});


router.post('/peopple', async function(req, res, next) {
  const { query, body } = req;
  const requestParams = {
    searchParams: query,
    json: body,
    responseType: 'json'
  };

  try {
    const response = await got.post('https://search.torre.co/peopple/_search/', requestParams)
    res.json(response.body);
  } catch (error) {
    var errorNumber = getErrorCode(error);
    res.status(errorNumber).json({ message: error.message });
  }
});


function getErrorCode(error) {
  return error.number || parseInt(error.message.match(/\d{3}/g))
}


module.exports = router;
