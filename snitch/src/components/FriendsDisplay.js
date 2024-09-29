// import React from 'react';
// import {
//     Box,
//     Text,
//     VStack,
//   } from '@chakra-ui/react';
// const { MongoClient } = require("mongodb");
 
// // Replace the following with your Atlas connection string
// const uri =  
//   "mongodb+srv://kirthiry:kirthiry@cluster0.vzooj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";;

// const client = new MongoClient(uri);

// function FriendsDisplay() {
//     // const friends = `
//     // Jane    123-456-7890
//     // John    234-345-6789
//     // Jackie  345-567-7890
//     // Johnny  008-876-6534
//     // James   648-274-2452
//     // `;

//     // const friendsArray = friends.trim().split('\n').map(line => {
//     //     const [friendName, phoneNum] = line.trim().split(/\s{1,}/);
//     //     return { friend: friendName, number: phoneNum };
//     // });

//     async function fetch() {
//         try {
//             // Connect to the Atlas cluster
//              await client.connect();
    
//              // Get the database and collection on which to run the operation
//              const db = client.db("snitch");
//              const col = db.collection("users");

//             //  // Find the document
//               const filter = { "name": "kirthi" };
//               const document = await col.findOne(filter);
    
//             //  // Print results
//               console.log("Document found:\n" + JSON.stringify(document));
    
//             } catch (err) {
//              console.log(err.stack);
//          }
     
//          finally {
//             await client.close();
//         }
//     }
//     (async () => {
//         await find();  // Call the find function
//     })();
    
//     return(
//         <Box padding="4">
//                 <Text fontSize="2xl" mb={4}>Your Friends:</Text>
//                 <VStack spacing={4} align="start">
//                     {friendsArray.map((cls, index) => (
//                         <Box key={index} p={4} shadow="md" borderWidth="1px" width="100%" >
//                             <Text fontWeight="bold">{cls.friend}</Text>
//                             <Text>Phone: {cls.number}</Text>
//                         </Box>
//                     ))}
//                 </VStack>
//         </Box>
//     );
// }
// export default FriendsDisplay;

import React, { useEffect, useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

function FriendsDisplay() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        async function fetchFriends() {
            try {
                const response = await fetch('http://localhost:5000/api/friends/'); // Adjust the URL as needed
                const data = await response.json();
                setFriends(data ? data.addresses : []); // Adjust based on your document structure
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        }

        fetchFriends();
    }, []);

    return (
        <Box padding="4">
            <Text fontSize="2xl" mb={4}>Your Friends:</Text>
            <VStack spacing={4} align="start">
                {friends.map((friend, index) => (
                    <Box key={index} p={4} shadow="md" borderWidth="1px" width="100%">
                        <Text fontWeight="bold">{friend.friend}</Text>
                        <Text>Phone: {friend.number}</Text>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
}

export default FriendsDisplay;
