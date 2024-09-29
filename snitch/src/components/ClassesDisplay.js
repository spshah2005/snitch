import React, { useState, useEffect } from 'react';
import {
    ChakraProvider,
    IconButton,
    Box,
    Text,
    VStack,
    useToast,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function ClassesDisplay() {

    const [classes, setClasses] = useState([]);
    const [className, setClassName] = useState('');
    const [days, setDays] = useState('');
    const [times, setTimes] = useState('');
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        async function fetchClasses() {
            try {
                const response = await fetch('http://localhost:5001/api/data/', {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClasses(Array.isArray(data.classes) ? data.classes : []);
            } catch (error) {
                console.error('Error fetching classes:', error);
                setClasses([]); // Fallback to empty array on error
            }
        }

        fetchClasses();
    }, []);

    const handleAddClick = async () => {
        onOpen();
    };

    const handleSubmit = async () => {
        const newClass = { class: className, days: days, times: times };

        try {
            const response = await fetch('http://localhost:5001/api/classes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClass),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add class');
            }
            setClasses(prevClasses => [
                ...prevClasses,
                newClass
            ]);

            toast({
                title: "Class Added",
                description: "The class has been added successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // setSchedule(prev => prev + `\n${className}    ${days}    ${times}`);
            setClassName('');
            setDays('');
            setTimes('');
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
        <ChakraProvider>
            <Box padding="4" transform="scale(1.0)">
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
                    <Text fontSize="2xl">Your Classes:</Text>
                    <IconButton
                        aria-label="Add class"
                        icon={<AddIcon />}
                        onClick={handleAddClick}
                        colorScheme="teal"
                        size="sm"
                    />
                </Box>

                <VStack spacing={4} align="start" width="100%">
                    {classes.map((cls, index) => (
                        <Box key={index} p={4} shadow="md" borderWidth="1px" width="100%" textAlign="left">
                            <Text fontWeight="bold">{cls.class}</Text>
                            <Text>Days: {cls.days}</Text>
                            <Text>Time: {cls.times}</Text>
                        </Box>
                    ))}
                </VStack>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add a New Class</ModalHeader>
                        <ModalBody>
                            <Input
                                placeholder="Class Name"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                mb={3}
                            />
                            <Input
                                placeholder="Days (e.g., Mon,Tue)"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                mb={3}
                            />
                            <Input
                                placeholder="Times (e.g., 8-9)"
                                value={times}
                                onChange={(e) => setTimes(e.target.value)}
                                mb={3}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="teal" onClick={handleSubmit}>
                                Add Class
                            </Button>
                            <Button onClick={onClose} ml={3}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </ChakraProvider>
    );
}

export default ClassesDisplay;
