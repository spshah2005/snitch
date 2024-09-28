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

    // Split schedule into array and parse the data into objects
    const classesArray = schedule.trim().split('\n').map(line => {
        const [className, days, times] = line.trim().split(/\s{2,}/);
        return { class: className, days: days.split(','), times };
    });

    // Find the longest class string to determine the width
    const maxLength = Math.max(
        ...classesArray.map(cls => {
            const combinedText = `${cls.class} Days: ${cls.days.join(', ')} Time: ${cls.times}`;
            return combinedText.length;
        })
    );

    // Convert maxLength into a rough width in characters (assuming an average character width)
    const boxWidth = `${maxLength * 8}px`; // Adjust `8px` as the average character width

    return (
        <Box padding="4" transform="scale(0.9)"> {/* Shrink everything by 10% */}
            <Text fontSize="2xl" mb={4}>Your Classes:</Text>
            <VStack spacing={4} align="start" width="100%"> {/* Set full width */}
                {classesArray.map((cls, index) => (
                    <Box 
                        key={index} 
                        p={4} 
                        shadow="md" 
                        borderWidth="1px" 
                        width={boxWidth}  // Set the width based on longest box
                        textAlign="left"  // Ensure content is left-aligned
                    >
                        <Text fontWeight="bold">{cls.class}</Text>
                        <Text>Days: {cls.days.join(', ')}</Text>
                        <Text>Time: {cls.times}</Text>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
}

export default ClassesDisplay;
