import React from 'react';
import {
    ChakraProvider,
    Box,
    Text,
    VStack,
    theme,
} from '@chakra-ui/react';

function ClassesDisplay() {
    const schedule = `
    eecs-370    Mon,Tue,Wed    8-9
    eecs-281    Tue,Thu,Fri    9-10
    eecs-215    Mon,Wed,Fri    10-11
    eecs-485    Tue,Wed,Fri    11-12
    eecs-388    Wed,Thu,Fri    10-12
    `;

    const classesArray = schedule.trim().split('\n').map(line => {
        const [className, days, times] = line.trim().split(/\s{2,}/);
        return { class: className, days: days.split(','), times };
    });

    return (
        <ChakraProvider theme={theme}>
            <Box padding="4">
                <Text fontSize="2xl" mb={4}>Your Classes:</Text>
                <VStack spacing={4} align="start">
                    {classesArray.map((cls, index) => (
                        <Box key={index} p={4} shadow="md" borderWidth="1px" width="100%">
                            <Text fontWeight="bold">{cls.class}</Text>
                            <Text>Days: {cls.days.join(', ')}</Text>
                            <Text>Time: {cls.times}</Text>
                        </Box>
                    ))}
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default ClassesDisplay;
