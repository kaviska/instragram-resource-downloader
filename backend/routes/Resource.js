const express = require('express');
const router = express.Router();
const { reelHandler,downloadReelHandler,imageHandler,downloadSingleImage } = require('../controller/ResourceHandler');

router.post('/reel', reelHandler);
router.get('/download-reel', downloadReelHandler);
router.get('/download-image-single', downloadSingleImage);
router.post('/image',imageHandler);


module.exports = router;