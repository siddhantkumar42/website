const {MongoClient} = require('mongodb')

const url = "mongodb+srv://pritam:" + encodeURIComponent(`${process.env.MONGO_PASS}`) + "@cluster0.w2y5k.mongodb.net/main?retryWrites=true&w=majority";
const client = new MongoClient(url, {useUnifiedTopology: true});

async function addViews() {
    try {
        await client.connect();
        const db = client.db("main");
        const collection = db.collection("views");
        await collection.updateOne({_id:"views"}, {$inc:{total:1}});
    } catch (e) {
        console.log(e);
    } finally {
        client.close();
    }
}

module.exports = {addViews};