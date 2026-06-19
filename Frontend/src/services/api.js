import axios from "axios";

async function createShortURL(url) {
    if (!url) throw new Error("URL needed");

    try {
        const res = await axios.post("http://localhost:8001/url", {
            url,
        });

        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function getAllUrls() {
    try{
        const res=await axios.get("http://localhost:8001/url");
        return res.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
export {createShortURL,getAllUrls};
