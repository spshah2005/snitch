import React from 'react';
import {
    Box,
    Text,
    VStack,
  } from '@chakra-ui/react';

function FriendsDisplay() {
    const friends = `
    Jane    123-456-7890
    John    234-345-6789
    Jackie  345-567-7890
    Johnny  008-876-6534
    James   648-274-2452
    `;

    const friendsArray = friends.trim().split('\n').map(line => {
        const [friendName, phoneNum] = line.trim().split(/\s{1,}/);
        return { friend: friendName, number: phoneNum };
    });

    return(
        <Box padding="4">
                <Text fontSize="2xl" mb={4}>Your Friends:</Text>
                <VStack spacing={4} align="start">
                    {friendsArray.map((cls, index) => (
                        <Box key={index} p={4} shadow="md" borderWidth="1px" width="100%" >
                            <Text fontWeight="bold">{cls.friend}</Text>
                            <Text>Phone: {cls.number}</Text>
                        </Box>
                    ))}
                </VStack>
        </Box>
    );
}
export default FriendsDisplay;