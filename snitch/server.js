const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json()); 
const port = process.env.PORT || 5001;

const uri = "mongodb+srv://kirthiry:kirthiry@cluster0.vzooj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Enable CORS for your React app
app.use(cors({
    origin: 'http://localhost:3000' // Allow only your React app
}));

app.get('/api/data/', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("snitch");
        const col = db.collection("users");
        const filter = { "name": "kirthi" }; // Adjust filter as needed
        const document = await col.findOne(filter);
        if (!document) {
            return res.status(404).send('No document found');
        }
        res.json(document); // Send the document as a response
    } catch (err) {
        console.error('Error fetching data:', err.message);
        res.status(500).send('Error fetching data: ' + err.message);
    } finally {
        await client.close(); // Ensure the connection is closed
    }
});


app.post('/api/classes/', async (req, res) => {
    const { class: className, days, times } = req.body;
    // Validate request body
    if (!className || !days || !times) {
        return res.status(400).send({ message: "Missing required fields" });
    }

    try {
        await client.connect();
        const db = client.db("snitch");
        const col = db.collection("users");

        const filter = { "name": "kirthi" }; // Adjust filter as needed
        const document = await col.findOne(filter);

        if (!document) {
            return res.status(404).send({ message: "User not found" });
        }

        // Create the new class object
        const newClass = { class: className, days, times }; // Use 'class' for the database

        // Use updateOne with $push to add the new class to the classes array
        const result = await col.updateOne(filter, { $push: { classes: newClass } });

        if (result.modifiedCount === 1) {
            res.status(201).send({ message: "Class added" });
        } else {
            res.status(500).send({ message: "Failed to add class" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to add class" });
    }
});

app.post('/api/friends/', async (req, res) => {
    const { name, phone } = req.body; // Corrected destructuring

    // Validate request body
    if (!name || !phone) {
        return res.status(400).send({ message: "Missing required fields" });
    }

    try {
        await client.connect();
        const db = client.db("snitch");
        const col = db.collection("users");

        const filter = { "name": "kirthi" }; // Adjust filter as needed
        const document = await col.findOne(filter);

        if (!document) {
            return res.status(404).send({ message: "User not found" });
        }

        // Create the new friend object
        const newFriend = { name, phone }; // Use 'name' for the property
        const result = await col.updateOne(filter, { $push: { friends: newFriend } });
        console.log(newFriend);
        if (result.modifiedCount === 1) {
            res.status(201).send({ message: "Friend added" });
        } else {
            res.status(500).send({ message: "Failed to add friend" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to add friend" });
    }
});

app.post('/api/deadlines/', async (req, res) => {
    const {className, assignment, due_date } = req.body; 
    // Validate request body
    if (!className || !assignment || !due_date) {
        return res.status(400).send({ message: "Missing required fields" });
    }

    try {
        await client.connect();
        const db = client.db("snitch");
        const col = db.collection("users");

        const filter = { "name": "kirthi" }; // Adjust filter as needed
        const document = await col.findOne(filter);

        if (!document) {
            return res.status(404).send({ message: "Deadline not found" });
        }

        // Create the new friend object
        const dueDateObject = new Date(due_date);
        const newDeadline = { className, assignment, dueDateObject }; 
        const result = await col.updateOne(filter, { $push: { deadlines: newDeadline } });

        if (result.modifiedCount === 1) {
            res.status(201).send({ message: "Deadline added" });
        } else {
            res.status(500).send({ message: "Failed to add deadline" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to add friend" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});