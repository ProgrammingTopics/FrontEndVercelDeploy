import { ReactNode, useEffect } from "react";
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
import { HiDocumentReport } from "react-icons/hi";
import { RiTeamFill } from "react-icons/ri";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
let LinkItems: Array<LinkItemProps> = [];
export default function Sidebar({ children }: { children: ReactNode }) {
  useEffect(() => {
    switch (UserManager.getUserType()) {
      case "RH": {
        LinkItems = [
          { name: "Home", icon: FiHome },
          { name: "Tasks", icon: BsGithub },
          { name: "Reports", icon: HiDocumentReport },
          { name: "Employers", icon: BsFileEarmarkPerson },
          { name: "Exit", icon: CgLogOff },
        ];
        break;
      }
      case "Manager": {
        LinkItems = [
          { name: "Home", icon: FiHome },
          { name: "Tasks", icon: BsGithub },
          { name: "Team", icon: RiTeamFill },
          { name: "Exit", icon: CgLogOff },
        ];
        break;
      }
      default: {
        LinkItems = [
          { name: "Home", icon: FiHome },
          { name: "Tasks", icon: BsGithub },
          { name: "Exit", icon: CgLogOff },
        ];
        break;
      }
    }
  }, []);

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
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
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

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
