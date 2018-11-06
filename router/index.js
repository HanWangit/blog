const express = require('express');
const router = express.Router();

const clr = require ('../controller/c_index');

router.get('/',clr.handleIndexGet);

module.exports = router