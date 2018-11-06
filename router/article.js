const express = require('express')
const router = express.Router();

const clr = require ('../controller/c_article');

router.get('/articleAdd',clr.handleArticalAddGet);

router.post('/articleAdd',clr.handleArticalAddPost);


module.exports = router
