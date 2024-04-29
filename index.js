const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT  || 5000;

//middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hywwrqy.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("artStore");
    const categoryCollection = database.collection("category");
    const itemsCollection = database.collection("items")
    
    app.get('/', async (req, res) => {
      const cursor = categoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/allItems', async (req, res) => {
      const item = req.body;
      const result = await itemsCollection.insertOne(item);
      res.send(result);
    })

    app.get('/allItems', async (req, res) => {
      const cursor = itemsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/item/:id', async (req, res) => {
      const id = new ObjectId(req.params.id)
      const result = await itemsCollection.findOne({_id: id})
      res.send(result); 
    })

    // Clay-Made Pottery
    app.get('/items/662d5f1eabfe07032c42c4ad', async (req, res) => {
      const query = {category: "Clay-made pottery"};
      const cursor = itemsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })
    // Stoneware
    app.get('/items/662d6032abfe07032c42c4b1', async (req, res) => {
      const query = {category: "Stoneware"};
      const cursor = itemsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })
    // Porcelain
    app.get('/items/662d6096abfe07032c42c4b2', async (req, res) => {
      const query = {category: "Porcelain"};
      const cursor = itemsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })
    // Terra Cotta
    app.get('/items/662d60e3abfe07032c42c4b3', async (req, res) => {
      const query = {category: "Terra Cotta"};
      const cursor = itemsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })
    // Ceramics & Architectural
    app.get('/items/662d614eabfe07032c42c4b5', async (req, res) => {
      const query = {category: "Ceramics & Architectural"};
      const cursor = itemsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })
    // Home Decor Pottery
    app.get('/items/662d6209abfe07032c42c4b6', async (req, res) => {
      const query = {category: "Home decor pottery"};
      const cursor = itemsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/myList/:id', async (req, res) => {
      const query = {email: req.params.id};
      const cursor = itemsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result); 
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port)