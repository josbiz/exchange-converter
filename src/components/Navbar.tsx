import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { Logo } from "./Icons";

function Navbar() {
  const links = [
    { name: "Common", href: "#common" },
    { name: "Charts", href: "#chart" },
  ];

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-around"
      alignContent="center"
      py={4}
    >
      <Flex
        flexDirection="row"
        justifyContent="center"
        alignContent="center"
        p={2}
      >
        <Box h="25px" w="25px" mx={2}>
          <Logo />
        </Box>
        <Heading as="h1" size="md">
          Exchange Converter
        </Heading>
      </Flex>
      <Flex flexDirection="row" alignItems="center">
        {links.map((link) => (
          <Box key={link.name} mx={2}>
            <Link href={link.href}>{link.name}</Link>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}

export default Navbar;
