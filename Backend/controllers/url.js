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

    res.json({newURL:`http://localhost:8001/url/${shortId}`});
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

async function handleAllURLS(req, res) {
    try {
        const allUrls = await URL.find();

        return res.status(200).json({
            allUrls,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}
module.exports={handleGenerateNewShortURL,handleIncrement,handleAllURLS}