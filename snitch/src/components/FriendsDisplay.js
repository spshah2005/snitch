import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, IconButton, useToast, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function FriendsDisplay() {
    const [friends, setFriends] = useState([]);
    const [friendName, setFriendName] = useState('');
    const [friendPhone, setFriendPhone] = useState('');
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        async function fetchFriends() {
            try {
                const response = await fetch('http://localhost:5001/api/data/', {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFriends(Array.isArray(data.friends) ? data.friends : []);
            } catch (error) {
                console.error('Error fetching friends:', error);
                setFriends([]); // Fallback to empty array on error
            }
        }

        fetchFriends();
    }, []);

    const handleAddClick = () => {
        onOpen();
    };

    const handleSubmit = async () => {
        const newFriend = { name: friendName, phone: friendPhone };

        try {
            const response = await fetch('http://localhost:5001/api/friends/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFriend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add friend');
            }
            setFriends(prevFriends => [
                ...prevFriends,
                newFriend
            ]);

            toast({
                title: "Friend Added",
                description: "The friend has been added successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Optionally, refetch friends or add friend locally
            setFriends(prev => [...prev, newFriend]);
            setFriendName('');
            setFriendPhone('');
            onClose();
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box padding="4">
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
                <Text fontSize="2xl">Your Friends:</Text>
                <IconButton
                    aria-label="Add friend"
                    icon={<AddIcon />}
                    onClick={handleAddClick}
                    colorScheme="teal"
                    size="sm"
                />
            </Box>
            <VStack spacing={4} align="start">
                {friends.map((friend, index) => (
                    <Box key={index} p={4} shadow="md" borderWidth="1px" width="100%">
                        <Text fontWeight="bold">{friend.name}</Text>
                        <Text>Phone: {friend.phone}</Text>
                    </Box>
                ))}
            </VStack>

            {/* Modal for adding a friend */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a New Friend</ModalHeader>
                    <ModalBody>
                        <Input
                            placeholder="Friend's Name"
                            value={friendName}
                            onChange={(e) => setFriendName(e.target.value)}
                            mb={3}
                        />
                        <Input
                            placeholder="Friend's Phone"
                            value={friendPhone}
                            onChange={(e) => setFriendPhone(e.target.value)}
                            mb={3}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleSubmit}>
                            Add Friend
                        </Button>
                        <Button onClick={onClose} ml={3}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default FriendsDisplay;
