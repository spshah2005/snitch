import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Flex,
  Button,
  Image,
  Container,
  keyframes,
  Heading as ChakraHeading,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './NavBar';

const typeAnimation = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

function Heading() {
  const [key, setKey] = useState(0);
  const [subheadingIndex, setSubheadingIndex] = useState(0);

  const subheadings = [
    "Your Productivity Partner",
    "Beat Procrastination",
    "Stay Accountable",
    "Track Your Progress"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prevKey => prevKey + 1);
      setSubheadingIndex(prevIndex => (prevIndex + 1) % subheadings.length);
    }, 8000); // Repeat every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box minHeight="100vh" width="100vw" overflow="hidden" bg="purple.50">
      <NavBar /> 
      <Container maxW="container.xl" p={8} h="100vh">
        <Flex direction="column" align="center" justify="center" minHeight="100vh">
          {/* Heading Section */}
          <Box position="relative" mb={4} textAlign="center">
            <ChakraHeading
              as="h1"
              size="4xl"
              color="purple.600"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="bold"
            >
              Welcome to{' '}
              <Box as="span" display="inline-block" position="relative" overflow="hidden" verticalAlign="top">
                <Box
                  key={key}
                  as="span"
                  display="inline-block"
                  animation={`${typeAnimation} 1s steps(6, end) forwards`}
                  whiteSpace="nowrap"
                  overflow="hidden"
                >
                  Snitch
                </Box>
              </Box>
            </ChakraHeading>
          </Box>

          {/* Subheading Section */}
          <Box height="40px" mb={8} width="100%" position="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={subheadingIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <Text
                  fontSize="2xl"
                  color="purple.400"
                  fontFamily="'Roboto', sans-serif"
                  fontWeight="medium"
                >
                  {subheadings[subheadingIndex]}
                </Text>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Content Section */}
          <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between" w="full" mt={8}>
            <VStack spacing={8} align="start" flex="1" mr={{ base: 0, lg: 8 }} mb={{ base: 8, lg: 0 }} maxW={{ base: "100%", lg: "45%" }}>
              <Text fontSize="xl" lineHeight="tall" fontFamily="'Roboto', sans-serif" color="purple.700">
                Snitch keeps you focused by sending friendly nudges to your contacts if you stray from your tasks. Set goals and conquer procrastination!
              </Text>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  colorScheme="purple" 
                  size="lg" 
                  px={8} 
                  fontWeight="bold" 
                  bgGradient="linear(to-r, purple.400, purple.600)"
                  borderRadius="full" 
                  boxShadow="lg"
                >
                  Get Started
                </Button>
              </motion.div>
            </VStack>
            
            <Box flex="1" maxW={{ base: "100%", lg: "450px" }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
              >
                <Image 
                  src='/images/screenshot.jpeg'
                  alt="Snitch App Screenshot" 
                  borderRadius="lg"
                  boxShadow="2xl"
                  w="full"
                  h="auto"
                  height='320px'
                  width='450px'
                />
              </motion.div>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Heading;