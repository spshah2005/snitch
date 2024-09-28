import React from 'react';
import {
    ChakraProvider, 
    Radio,
    RadioGroup,
    Stack,
    Box,
    Text,
    VStack
  } from '@chakra-ui/react';
  
function DeadlineDisplay() {
    const deadlines = `
    eecs-370    hw-1        9/23/2024
    eecs-281    project-1   9/30/2024
    eecs-215    hw-4        9/28/2024
    eecs-485    project-3   9/28/2024
    eecs-388    project-2   9/28/2024
    `;

    const deadlinesArray = deadlines.trim().split('\n').map(line => {
        const [className, assignment, deadline] = line.trim().split(/\s{2,}/);
        return { className: className, assignment: assignment, deadline: new Date(deadline) };
    });

     // Find the longest class string to determine the width
     const maxLength = Math.max(
      ...deadlinesArray.map(cls => {
          const combinedText = `$Assignment: ${cls.assignment}`;
          return combinedText.length;
      })
  );

  const boxWidth = `${maxLength *9}px`; // Adjust `9px` as the average character width
  const today = new Date();
  
  function compareDate(date) {
    if(today <= date){
      return true;
    }
    return false;
  }
  
    return(
      <Box padding="4">
      <Text fontSize="2xl" mb={4}>Deadlines</Text>
      <VStack spacing={4} align="start">
          {deadlinesArray.map((cls, index) => (
            {compareDate(cls.deadline) ? }
              <Box key={index} p={4} shadow="md" borderWidth="1px" width={boxWidth} >
                  <Text fontWeight="bold">{cls.friend}</Text>
                  <Text>Class Name: {cls.className}</Text>
                  <Text>Assignment: {cls.assignment}</Text>
                  <Text>Deadline: {cls.deadline.toLocaleDateString()}</Text>
              </Box>
          ))}
      </VStack>
</Box>
    );
}
export default DeadlineDisplay;