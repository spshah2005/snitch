const express = require('express');
const cors = require('cors');
// const twilio = require('twilio')
const { MongoClient , ObjectId} = require('mongodb');

// const sms_client = twilio(accountSid, authToken);


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

app.get('/api/deadlines/', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("snitch");
        const col = db.collection("users");
        const filter = { "name": "kirthi" }; // Adjust as needed

        const document = await col.findOne(filter);
        if (!document) {
            return res.status(404).send({ message: "No deadlines found" });
        }

        res.json(document.deadlines );
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: "Failed to fetch deadlines" });
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
    const {className, assignment, deadline } = req.body; 
    
    // Validate request body
    if (!className || !assignment || !deadline) {
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

        const newDeadline = { className, assignment, deadline , _id: new ObjectId()}; 
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

app.delete('/api/deadlines/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        await client.connect();
        const db = client.db("snitch");
        const col = db.collection("users");

        const filter = { "name": "kirthi" }; // Adjust filter as needed
        const updateResult = await col.updateOne(
            filter,
            { $pull: { deadlines: { _id: new ObjectId(id) } } } // Use $pull to remove the deadline by its ID
        );

        if (updateResult.modifiedCount === 1) {
            res.status(200).send({ message: "Deadline deleted" });
        } else {
            res.status(404).send({ message: "Deadline not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to delete deadline" });
    } finally {
        await client.close(); // Ensure the client is closed after the operation
    }
});

// app.post('/send-sms', (req, res) => {
//     const { body } = req.body;

//     sms_client.messages
//         .create({
//             body: body || 'Test message',
//             messagingServiceSid: 'MG35a98a1188d0ae130b0ea80e2050176a', // Your Messaging Service SID
//             to: '+18777804236' // Recipient phone number
//         })
//         .then(message => {
//             console.log(`Message sent with SID: ${message.sid}`);
//             res.status(200).json({ success: true, messageSid: message.sid });
//         })
//         .catch(error => {
//             console.error('Error sending message:', error);
//             res.status(500).json({ success: false, error: error.message });
//         });
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});