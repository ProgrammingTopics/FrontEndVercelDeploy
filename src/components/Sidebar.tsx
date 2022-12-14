import { ReactNode, useEffect, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import { FiHome, FiMenu } from "react-icons/fi";
import { CgLogOff } from "react-icons/cg";
import { IconType } from "react-icons";
import { BsGithub, BsFileEarmarkPerson } from "react-icons/bs";
import { ReactText } from "react";
import { useNavigate } from "react-router-dom";
import UserManager from "./utils/userController";
import { RiTeamFill } from "react-icons/ri";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  const handleRoute = (path: string) => navigate(path);

  const onClickNavigate = (pathName: string) => {
    pathName !== "Exit" ? handleRoute("/" + pathName) : handleRoute("/");
  };
  const [LinkItems, setLinkItems] = useState<LinkItemProps[]>([]);
  useEffect(() => {
    switch (UserManager.getUserType()) {
      case "RH": {
        setLinkItems([
          { name: "Home", icon: FiHome },
          { name: "Tasks", icon: BsGithub },
          { name: "Employers", icon: BsFileEarmarkPerson },
          { name: "Exit", icon: CgLogOff },
        ]);
        break;
      }
      case "Manager": {
        setLinkItems([
          { name: "Home", icon: FiHome },
          { name: "Tasks", icon: BsGithub },
          { name: "Team", icon: RiTeamFill },
          { name: "Exit", icon: CgLogOff },
        ]);
        break;
      }
      default: {
        setLinkItems([
          { name: "Home", icon: FiHome },
          { name: "Tasks", icon: BsGithub },
          { name: "Exit", icon: CgLogOff },
        ]);

        break;
      }
    }
  }, []);
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      bgGradient="radial-gradient(circle, #f0f9ff, #dceefa, #c9e3f5, #b5d8f1, #a1cdec);"
      boxShadow="2xl"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="5xl"
          fontWeight="extrabold"
          bgClip="text"
          bgGradient="linear-gradient(to right top, #00388c, #3553a3, #566fba, #758cd2, #94aae9)"
        >
          288RH
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            onClickNavigate(link.name);
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        fontSize="5xl"
        fontWeight="extrabold"
        bgClip="text"
        bgGradient="linear-gradient(to right top, #00388c, #3553a3, #566fba, #758cd2, #94aae9)"
      >
        288RH
      </Text>
    </Flex>
  );
};
