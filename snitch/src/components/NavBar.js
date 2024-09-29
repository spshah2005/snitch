import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const NavBar = () => {
  return (
    <Box as="nav" position="fixed" top="0" left="0" right="0" zIndex="1000" boxShadow="md">
      <Flex
        bg={useColorModeValue('white', 'gray.900')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'70px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        align={'center'}
        justify={'space-between'}
      >
        <Text
          fontFamily={'heading'}
          fontSize="xl"
          color={useColorModeValue('purple.600', 'white')}
          fontWeight="bold"
        >
          Snitch
        </Text>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bgGradient="linear(to-r, purple.400, purple.600)"
            href={'#'}
            _hover={{
              bgGradient: 'linear(to-r, purple.300, purple.500)',
            }}
            borderRadius="full"
            px={8}
            py={2}
          >
            Sign In
          </Button>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default NavBar;