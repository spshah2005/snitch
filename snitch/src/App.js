import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  theme,
} from '@chakra-ui/react';
import ClassesDisplay from './components/ClassesDisplay';
import FriendsDisplay from './components/FriendsDisplay';
import DeadlineDisplay from './components/DeadlineDisplay';
import Heading from './components/Heading';
import Calendar from './pages/calendar';
import FeaturePage from './components/FeaturePage'

function App() {
  const [classes, setClasses] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [friends, setFriends] = useState([]);

  return (
    <ChakraProvider theme={theme}>
      <VStack spacing={4} padding={5} align="stretch" height="100vh">
        <Heading />

        {/* Top Row: Classes and Deadlines */}
        <Flex
          justify="space-between"
          align="flex-start"
          direction={{ base: 'column', md: 'row' }} // Responsive: column on small screens, row on larger screens
          flex="1"
        >
          <Box flex="1" margin="10px" maxHeight="40vh" overflowY="auto" borderWidth="1px" borderRadius="md" borderColor="gray.200">
            <ClassesDisplay classes={classes} setClasses={setClasses} />
          </Box>
          <Box flex="1" margin="10px" maxHeight="40vh" overflowY="auto" borderWidth="1px" borderRadius="md" borderColor="gray.200">
            <DeadlineDisplay deadlines={deadlines} setDeadlines={setDeadlines} />
          </Box>
        </Flex>

        {/* Bottom Row: Friends Display */}
        <Flex width="100%">
          <Box
            width="100%" // Make the Box take the full width
            maxHeight="40vh"
            overflowY="auto"
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.200"
            margin="10px" 
          >
            <FriendsDisplay friends={friends} setFriends={setFriends} />
          </Box>
        </Flex>

        {/* Calendar Component */}
        <Box margin="10px"   borderWidth="1px" borderRadius="md" borderColor="gray.200">
          <Calendar classes={classes} deadlines={deadlines} />
        </Box>



        <FeaturePage />

        
      </VStack>
    </ChakraProvider>
  );
}

export default App;
