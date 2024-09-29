import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();

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
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={6} h={6} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontSize="xl"
            color={useColorModeValue('purple.600', 'white')}
            fontWeight="bold"
          >
            Snitch
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}
            color={useColorModeValue('gray.600', 'white')}
          >
          </Button>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
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
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const linkBgHoverColor = useColorModeValue('purple.50', 'gray.700');

  return (
    <Stack direction={'row'} spacing={4} align="center">
      {NAV_ITEMS.map((navItem) => (
        <motion.div whileHover={{ y: -3, scale: 1.05 }} key={navItem.label}>
          <Box
            as="a"
            href={navItem.href}
            p={2}
            fontSize={'md'}
            fontWeight={500}
            color={linkColor}
            rounded={'md'}
            _hover={{
              bg: linkBgHoverColor,
              color: linkHoverColor,
              textDecoration: 'none',
            }}
          >
            {navItem.label}
          </Box>
        </motion.div>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }) => {
  return (
    <Flex
      py={2}
      as="a"
      href={href ?? '#'}
      justify={'space-between'}
      align={'center'}
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
        {label}
      </Text>
    </Flex>
  );
};

const NAV_ITEMS = [
  {
    label: 'Features',
    href: '#',
  },
  {
    label: 'Pricing',
    href: '#',
  },
  {
    label: 'About',
    href: '#',
  },
];

export default NavBar;
