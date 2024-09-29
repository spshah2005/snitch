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
    useDisclosure
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function DeadlineDisplay() {
    
    const [deadlines, setDeadlines] = useState([]);

    const maxLength = Math.max(
        ...deadlines.map(cls => {
            const combinedText = `Assignment: ${cls.assignment}`;
            return combinedText.length;
        })
    );

    const boxWidth = `${maxLength * 9}px`;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
                const response = await fetch('http://localhost:5001/api/data/', {
                    method: 'GET',
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

            // // Convert due_date to Date objects if needed
            // const deadlinesWithDates = data.deadlines.map(deadline => ({
            //     ...deadline,
            //     due_date: new Date(deadline.deadline) // Ensure due_date is a Date object
            // }));
            // console.log(deadlinesWithDates);
            await setDeadlines(data.deadlines);
            } catch (error) {
                console.error('Error fetching deadlines:', error);
                setDeadlines([]); 
            }
        }
    
        fetchDeadlines();
    }, []);

    const handleAddClick = () => {
        onOpen();
    };

    const handleSubmit = async () => {
        const newDeadline = {
            className: className,
            assignment: assignmentName,
            deadline: new Date(deadlineDate), // This is sent to the server
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
    
        // Update state with only due_date
        setDeadlines(prevDeadlines => [
            ...prevDeadlines,
            newDeadline
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
                    const deadlineDate = new Date(cls.deadline); // Ensure due_date is a Date object
                    return compareDate(deadlineDate) && (
                        <Box key={index} p={4} shadow="md" borderWidth="1px" width={boxWidth}>
                            <Text fontWeight="bold">{cls.assignment}</Text>
                            <Text>Class Name: {cls.className}</Text>
                            <Text>Deadline: {deadlineDate.toLocaleDateString('en-US')}</Text>
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
