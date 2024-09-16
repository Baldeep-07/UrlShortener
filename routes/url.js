const express=require('express');
const {generate, handle} = require('../controllers/url');

const router = express.Router();

router.post('/',generate);

router.get('/analytics/:shortId',handle)

module.exports = router;