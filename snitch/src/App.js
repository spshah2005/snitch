import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  theme,
  VStack
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

import ClassesDisplay from './components/ClassesDisplay';
import FriendsDisplay from './components/FriendsDisplay';
import DeadlineDisplay from './components/DeadlineDisplay';
import Heading from './components/Heading';
// import Features from './components/Features';

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* Flex container to display components horizontally */}
      <VStack>
          <Heading />
      <Flex
        justify="space-between"
        align="center"
        padding={5}
        direction={{ base: 'column', md: 'row' }} // Responsive: column on small screens, row on larger screens
      >
        {/* Box around each component for spacing */}
        <Box flex="1" margin="10px">
          <ClassesDisplay />
        </Box>
        <Box flex="1" margin="10px">
          <FriendsDisplay />
        </Box>
        <Box flex="1" margin="10px">
          <DeadlineDisplay />
        </Box>
      </Flex>

      {/* <Features/> */}
      </VStack>
    </ChakraProvider>
  );
}

export default App;
