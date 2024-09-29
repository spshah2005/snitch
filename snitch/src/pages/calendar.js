import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

function Calendar({ classes, deadlines }) {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay(); // Start of the week
    const days = [...Array(7)].map((_, i) => {
        const date = new Date(today);
        date.setDate(startOfWeek + i); // Adjust the date
        return {
            date: date,
            dayName: date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(), // Standardized to lower case
        };
    });

    return (
        <Box padding="4">
            {/* Header for the Weekly Calendar */}
            <Box bg="purple.600" color="white" p={4} borderRadius="md" mb={4} textAlign="center">
                <Text fontSize="xl" fontWeight="bold">Weekly Calendar</Text>
                <Text fontSize="sm">{today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
            </Box>

            <Flex justify="space-between" mb={4}>
                {days.map((day, index) => (
                    <Box key={index} flex="1" padding="2" borderWidth="1px" borderColor="gray.200" borderRadius="md" m={1} height="400px" position="relative" overflow="hidden">
                        <Text fontWeight="bold">{day.dayName.charAt(0).toUpperCase() + day.dayName.slice(1)}</Text>
                        <Text>{day.date.toLocaleDateString()}</Text>

                        {/* Class Blocks - Make scrollable */}
                        <Box overflowY="auto" maxHeight="75%">
                            {classes
                                .filter(cls => cls.days.toLowerCase().includes(day.dayName.substring(0, 3))) // Standardized comparison
                                .map(cls => {
                                    const times = cls.times.split(' - ');
                                    const startTime = new Date(day.date);
                                    const endTime = new Date(day.date);

                                    const [startHour, startMinute] = times[0].split(':');
                                    const [endHour, endMinute] = times[1].split(':');

                                    const startAmPm = times[0].includes('pm') ? 'pm' : 'am';
                                    const endAmPm = times[1].includes('pm') ? 'pm' : 'am';

                                    startTime.setHours(startHour % 12 + (startAmPm === 'pm' ? 12 : 0), startMinute);
                                    endTime.setHours(endHour % 12 + (endAmPm === 'pm' ? 12 : 0), endMinute);

                                    return (
                                        <Box
                                            key={cls.class}
                                            backgroundColor="purple.600"
                                            color="white"
                                            borderRadius="md"
                                            padding="1"
                                            marginTop="2"
                                            position="relative"
                                            height={`${(endTime - startTime) / (1000 * 60)}px`} // Height based on duration
                                            style={{ transition: 'height 0.2s' }}
                                        >
                                            <Text fontSize="sm">{cls.class}</Text>
                                            <Text fontSize="xs">{cls.times}</Text>
                                        </Box>
                                    );
                                })}
                        </Box>

                        {/* Deadlines (aligned at the bottom) */}
                        <Box position="absolute" bottom="2" left="2" right="2">
                            {deadlines
                                .filter(deadline => {
                                    const deadlineDate = new Date(deadline.deadline);
                                    // Convert both dates to UTC for comparison
                                    const isSameDay = (
                                        deadlineDate.getUTCDate() === day.date.getUTCDate() &&
                                        deadlineDate.getUTCMonth() === day.date.getUTCMonth() &&
                                        deadlineDate.getUTCFullYear() === day.date.getUTCFullYear()
                                    );
                                    return isSameDay;
                                })
                                .map(deadline => (
                                    <Box key={deadline.assignment}
                                         backgroundColor="purple.300"
                                         color="white"
                                         borderRadius="md"
                                         padding="1"
                                         textAlign="center"
                                         mt={1}>
                                        <Text fontSize="sm" fontWeight="bold">{deadline.assignment}</Text>
                                    </Box>
                                ))}
                        </Box>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
}

export default Calendar;
