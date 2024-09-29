const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

const uri = "mongodb+srv://kirthiry:kirthiry@cluster0.vzooj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

app.use(cors()); // Enable CORS for your React app

app.get('/api/friends/', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("snitch");
        const col = db.collection("users");

        const filter = { "name": "kirthi" }; // Adjust filter as needed
        const document = await col.findOne(filter);
        
        res.json(document);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
