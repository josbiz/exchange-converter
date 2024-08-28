import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

function FlexWrapper({children}: {children: ReactNode}) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Flex>
  );
}

export default FlexWrapper;
