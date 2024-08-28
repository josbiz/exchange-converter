import { Link, Button } from "@chakra-ui/react";
import { ArrowUp } from "./Icons";
import { useEffect, useState } from "react";

function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else if (window.scrollY === 0) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Link href="#">
      <Button
        position={"fixed"}
        right={10}
        bottom={10}
        variant="link"
        hidden={!isVisible}
        transition={"all 2s"}
        color={"red"}
      >
        <ArrowUp />
      </Button>
    </Link>
  );
}

export default TopButton;
