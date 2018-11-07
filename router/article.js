const express = require('express')
const router = express.Router();

const clr = require ('../controller/c_article');

router.get('/articleAdd',clr.handleArticleAddGet);

router.post('/articleAdd',clr.handleArticleAddPost);

router.get('/articleInfo/:id',clr.handleArticleInfoGet);

router.get('/articleEdit/:id',clr.handleArticleEditGet);

router.post('/articleEdit',clr.handleArticleEditPost);

module.exports = router
