const express=require('express');
const {handleGenerateNewShortURL,handleIncrement}=require('../controllers/url');
const router=express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/:shortId',handleIncrement);
module.exports=router;