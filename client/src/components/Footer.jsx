// import React from 'react';
// import './Footer.css';


// const Footer = () => (
//   <footer className="footer">
//     {/* <a
//       href="https://github.com/LizzieAmes"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <img src={githubLogo} alt="GitHub" className="social-icons" />
//     </a>
//     <a
//       href="https://www.linkedin.com/in/elizabeth-ames-2844671a6/"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <img src={linkedinLogo} alt="LinkedIn" className="social-icons" />
//     </a> */}
//   </footer>
// );

// export default Footer;
import React from 'react';
import './Footer.css';
import { Box, Flex, Text, Stack, Icon, Link } from '@chakra-ui/react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="pink.100" color="pink.800" padding="1.5rem" marginTop="1.5rem">
      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-between' }}
        direction={{ base: 'column', md: 'row' }}
        wrap="wrap"
      >
        <Text>
          © {new Date().getFullYear()} Sun & Whimsy Co. All rights reserved.
        </Text>
        <Stack direction="row" spacing={6} marginTop={{ base: 4, md: 0 }}>
          <Text> Follow us on Instagram!</Text>
          <Link href="https://www.instagram.com/sunandwhimsyco/" isExternal>
            <Icon as={FaInstagram} boxSize="24px" />
          </Link>
          {/* More social icons */}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
