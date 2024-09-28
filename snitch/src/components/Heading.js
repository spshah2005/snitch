import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Flex,
  Button,
  Image,
  useColorModeValue,
  Container,
  Heading as ChakraHeading,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Typing animation
const typeAnimation = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

function Heading() {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsTypingComplete(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box minHeight="100vh" bg={bgColor}>
      <Container maxW="container.xl" pt={20}>
        <Flex direction="column" align="center" justify="center" minHeight="80vh">
          <Box position="relative" mb={8}>
            <ChakraHeading as="h1" size="4xl" textAlign="center" color="purple.500" fontFamily="'Montserrat', sans-serif" fontWeight="bold">
              Welcome to{' '}
              <Box as="span" display="inline-block" overflow="hidden" whiteSpace="nowrap">
                <Box
                  as="span"
                  display="inline-block"
                  animation={`${typeAnimation} 2s steps(6, end)`}
                >
                  Snitch
                </Box>
                <Box
                  as="span"
                  display="inline-block"
                  animation={isTypingComplete ? "none" : "blink 0.7s infinite"}
                  ml={1}
                >
                  |
                </Box>
              </Box>
            </ChakraHeading>
          </Box>
          
          <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between" w="full">
            <VStack spacing={8} align="start" flex="1" mr={{ base: 0, lg: 8 }} mb={{ base: 8, lg: 0 }}>
              <Text fontSize="xl" lineHeight="tall" fontFamily="'Roboto', sans-serif">
                Snitch is your ultimate accountability partner. We keep you focused and on track by sending friendly nudges to your contacts if you stray from your tasks. Set your goals, connect your accounts, and conquer procrastination with Snitch!
              </Text>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  colorScheme="purple" 
                  size="lg" 
                  px={8} 
                  fontWeight="bold" 
                  borderRadius="full" 
                  boxShadow="lg"
                >
                  Get Started
                </Button>
              </motion.div>
            </VStack>
            
            <Box flex="1" maxW={{ base: "100%", lg: "50%" }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
              >
                <Image 
                  src="./images/screenshot.png" 
                  alt="Snitch App Screenshot" 
                  borderRadius="lg"
                  boxShadow="2xl"
                  w="full"
                  h="auto"
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