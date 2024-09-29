import React from 'react';
import {
  Box,
  VStack,
  Text,
  SimpleGrid,
  Icon,
  Flex,
  Container,
  useColorModeValue,
  Image,
  Button,
  Heading as ChakraHeading,
} from '@chakra-ui/react';
import { FaBell, FaClock, FaUsers, FaChartLine, FaLock, FaMobile } from 'react-icons/fa';
import { motion } from 'framer-motion';
import NavBar from './NavBar';

const Feature = ({ title, text, icon }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <VStack 
        p={6} 
        bg={useColorModeValue('white', 'purple.700')} 
        rounded="xl" 
        shadow="xl"
        height="100%"
        borderWidth={2}
        borderColor="purple.200"
      >
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={'purple.500'}
          mb={4}
        >
          {icon}
        </Flex>
        <Text fontWeight={700} fontSize="xl" mb={3} color="purple.600">{title}</Text>
        <Text color={useColorModeValue('gray.600', 'gray.300')} align={'center'} fontSize="md">{text}</Text>
      </VStack>
    </motion.div>
  );
};

const FeaturePage = () => {
  const bgColor = useColorModeValue('purple.50', 'gray.800');
  const textColor = useColorModeValue('purple.700', 'purple.200');

  return (
    <Box bg={bgColor} minHeight="100vh">
      <NavBar />
      <Container maxW={'7xl'} py={16}>
        <VStack spacing={6} textAlign="center" mb={16}>
          <ChakraHeading
            as="h1"
            size="3xl"
            color="purple.600"
            fontFamily="'Montserrat', sans-serif"
            fontWeight="bold"
          >
            Features
          </ChakraHeading>
          <Text fontSize={{ base: 'xl', md: '2xl' }} color={textColor} maxW="3xl" fontFamily="'Roboto', sans-serif">
            Discover how Snitch keeps you accountable and boosts your productivity
          </Text>
        </VStack>

        <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between" mb={20}>
          <VStack flex={1} align="start" spacing={8} mr={{ base: 0, lg: 12 }} mb={{ base: 12, lg: 0 }}>
            <ChakraHeading
              as="h2"
              size="2xl"
              color="purple.600"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="bold"
            >
              Your Personal Productivity Watchdog
            </ChakraHeading>
            <Text fontSize="xl" color={textColor} lineHeight="tall" fontFamily="'Roboto', sans-serif">
              Snitch is designed to keep you focused and accountable. Set your goals, connect your accounts, and let Snitch handle the rest. We'll send friendly reminders to your contacts if you stray from your tasks, ensuring you stay on track and conquer procrastination.
            </Text>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                colorScheme="purple" 
                size="lg" 
                leftIcon={<FaBell />}
                fontWeight="bold" 
                bgGradient="linear(to-r, purple.400, purple.600)"
                borderRadius="full" 
                boxShadow="lg"
              >
                Try Snitch Now
              </Button>
            </motion.div>
          </VStack>
          <Box flex={1} maxW={{ base: "100%", lg: "450px" }} alignSelf={{ base: "center", lg: "flex-start" }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <Image 
                src="/images/phonepic.png" 
                alt="Snitch App on Phone" 
                borderRadius="2xl" 
                boxShadow="2xl" 
                maxH="600px"
                objectFit="contain"
              />
            </motion.div>
          </Box>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FaBell} w={8} h={8} />}
            title={'Smart Notifications'}
            text={'Receive personalized reminders and let your contacts know when you need a productivity boost.'}
          />
          <Feature
            icon={<Icon as={FaClock} w={8} h={8} />}
            title={'Time Tracking'}
            text={'Automatically track your work hours and get alerts when you are falling behind on your goals.'}
          />
          <Feature
            icon={<Icon as={FaUsers} w={8} h={8} />}
            title={'Accountability Network'}
            text={'Build a network of friends, colleagues, or mentors who can help keep you accountable.'}
          />
          <Feature
            icon={<Icon as={FaChartLine} w={8} h={8} />}
            title={'Productivity Analytics'}
            text={'Gain insights into your work patterns and improve your time management skills over time.'}
          />
          <Feature
            icon={<Icon as={FaLock} w={8} h={8} />}
            title={'Privacy Controls'}
            text={'You are in control. Customize what information is shared and with whom to maintain your privacy.'}
          />
          <Feature
            icon={<Icon as={FaMobile} w={8} h={8} />}
            title={'Cross-Platform Support'}
            text={'Access Snitch on any device - desktop, tablet, or mobile. Stay accountable wherever you go.'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturePage;