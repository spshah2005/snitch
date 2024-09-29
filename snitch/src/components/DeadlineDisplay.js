import React, { useState, useEffect } from 'react';
import {
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
    useDisclosure
} from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';

function DeadlineDisplay({ deadlines, setDeadlines }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight for accurate date comparison

    const compareDate = (date) => today <= date;

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // New state variables for the modal
    const [className, setClassName] = useState('');
    const [assignmentName, setAssignmentName] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');

    useEffect(() => {
        async function fetchDeadlines() {
            try {
                const response = await fetch('http://localhost:5001/api/deadlines/', {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // await setDeadlines(data.map(deadline => ({
                //     ...deadline,
                //     deadline: new Date(deadline.deadline), // Ensure it's a Date object
                //     _id: deadline._id
                // })));
                await setDeadlines(data);
            } catch (error) {
                console.error('Error fetching deadlines:', error);
                setDeadlines([]); 
            }
        }
    
        fetchDeadlines();
    }, [setDeadlines]);

    const handleAddClick = () => {
        onOpen();
    };

    const handleSubmit = async () => {
        const newDeadline = {
            className: className,
            assignment: assignmentName,
            deadline: new Date(deadlineDate).toISOString(), // Send as ISO string for consistency
        };
    
        const response = await fetch('http://localhost:5001/api/deadlines/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDeadline),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add deadline');
        }
    
        // Update state with the new deadline
        setDeadlines(prevDeadlines => [
            ...prevDeadlines,
            { ...newDeadline, deadline: new Date(newDeadline.deadline), _id: newDeadline._id } // Convert to Date object
        ]);
    
        toast({
            title: "Deadline Added",
            description: "The deadline has been added successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    
        // Reset modal fields
        setClassName('');
        setAssignmentName('');
        setDeadlineDate('');
        onClose();
    };

    const handleComplete = async (deadline_id) => {
        // Send a request to your server to update the deadline status
        const response = await fetch(`http://localhost:5001/api/deadlines/${deadline_id}`, {
            method: 'DELETE', // Specify the method as DELETE
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to mark deadline as complete');
        }
    
        // Update state to remove the completed deadline (or mark it as completed)
        setDeadlines(prevDeadlines => prevDeadlines.filter(d => d._id !== deadline_id));
        toast({
            title: "Deadline Completed",
            description: "The deadline has been marked as completed.",
            status: "success",
            duration: 1000,
            isClosable: true,
        });
    };
    
    return (
        <Box padding="4">
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
                <Text fontSize="2xl">Deadlines</Text>
                <IconButton
                    aria-label="Add deadline"
                    icon={<AddIcon />}
                    onClick={handleAddClick}
                    colorScheme="teal"
                    size="sm"
                />
            </Box>
            <VStack spacing={4} align="start">
                {deadlines.map((cls, index) => {
                    const deadlineDate = new Date(cls.deadline); // Ensure deadline is a Date object
                    return compareDate(deadlineDate) && (
                        <Box key={index} p={4} shadow="md" borderWidth="1px" width="100%" display="flex" justifyContent="space-between" alignItems="center" >
                            <Box>
                                <Text fontWeight="bold">{cls.assignment}</Text>
                                <Text>Class Name: {cls.className}</Text>
                                <Text>Deadline: {deadlineDate.toLocaleDateString('en-US')}</Text>
                            </Box>
                            <IconButton
                                aria-label="Complete deadline"
                                icon={<CheckIcon />}
                                colorScheme="purple"
                                onClick={() => handleComplete(cls._id)}
                                variant="outline"
                                borderColor="purple.600"
                                color="purple.600"
                            />
                        </Box>
                    );
                })}
            </VStack>

            {/* Modal for adding a deadline */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a New Deadline</ModalHeader>
                    <ModalBody>
                        <Input
                            placeholder="Class Name"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            mb={3}
                        />
                        <Input
                            placeholder="Assignment Name"
                            value={assignmentName}
                            onChange={(e) => setAssignmentName(e.target.value)}
                            mb={3}
                        />
                        <Input
                            type="date"
                            placeholder="Deadline Date"
                            value={deadlineDate}
                            onChange={(e) => setDeadlineDate(e.target.value)}
                            mb={3}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleSubmit}>
                            Add Deadline
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

export default DeadlineDisplay;
