const express = require('express')
const router = express.Router();

const clr = require ('../controller/c_article');

router.get('/articleAdd',clr.handleArticalAddGet);

router.post('/articleAdd',clr.handleArticalAddPost);

router.get('/articleInfo',clr.handleArticalInfoGet);
module.exports = router
