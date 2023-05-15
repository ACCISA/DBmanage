const MongoClient = require("mongodb").MongoClient

const createInstanceRouter = (req, res) => {
    console.log("tasd")
    MongoClient.connect(process.env.MONGO_URL).then(async (client) => {
  
        const connect = client.db("insta");
      
        // New Collection
        const collection = await connect.createCollection("GFGCollection2");
        console.log(collection._id)
      
        console.log("collection created");
    }).catch((err) => {
      
        // Handling the error 
        console.log(err.Message);
    })
}

module.exports = createInstanceRouter;