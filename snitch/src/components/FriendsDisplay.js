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
