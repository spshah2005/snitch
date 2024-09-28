import React from 'react';
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
  } from '@chakra-ui/react';
  
function ClassesDisplay() {
    //const fs = require('fs');
    //const fileContent = fs.readFileSync('classes.txt', 'utf-8');

    // Process the file content and parse each line into objects
    //const classesArray = fileContent.trim().split('\n').map(line => {
    //    const [className, days, times] = line.trim().split(/\s{2,}/);  // Split by multiple spaces
    //    return { class: className, days: days.split(','), times };
    //});

    // Output the array of classes
    //console.log(classesArray);

    return(
        <div>
            Your Classes!
        </div>
    );
}
export default ClassesDisplay;