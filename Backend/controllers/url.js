const {nanoid}=require('nanoid')
const URL=require('../models/url')
async function handleGenerateNewShortURL(req,res) {
   
    const body=req.body;
    if(!body.url){
        return res.status(400).json({err:'URL is not Provided'});
    }
    const shortId=nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL:body.url,
        visitHistory:[]
    })

    res.json({newURL:shortId});
}
async function handleIncrement(req,res) {
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },
    {
        $push:{
            visitHistory: {
                timestamp:Date.now()
            }
        }
    }
)
res.redirect(entry.redirectURL);
}
module.exports={handleGenerateNewShortURL,handleIncrement}