import { Box, Link } from "@chakra-ui/react";

function Footer() {
  return (
    <Box textAlign="center" fontSize={"15px"} py="50">
      Made by{" "}
      <Link
        href="https://github.com/josbiz"
        target="_blank"
        fontStyle={"italic"}
        fontWeight={"bold"}
        color={"gray.600"}
      >
        Josbiz
      </Link>
    </Box>
  );
}

export default Footer;
