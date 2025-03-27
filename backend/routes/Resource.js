const express = require('express');
const router = express.Router();
const { reelHandler,downloadReelHandler,imageHandler,downloadSingleImage,fetchRequesthandler } = require('../controller/ResourceHandler');

router.post('/reel', reelHandler);
router.get('/download-reel', downloadReelHandler);
router.get('/download-image-single', downloadSingleImage);
router.post('/image',imageHandler);
router.get('/send-request/:type/:id', fetchRequesthandler);

module.exports = router;