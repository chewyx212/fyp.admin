import React from "react";
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
  Stack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiBox,
  FiUsers,
  FiLogOut,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../app/auth/authSlice";
import { useHistory, useLocation } from "react-router";

interface LinkItemProps {
  name: string;
  link: string;
  icon: IconType;
  subNav: SubNavList[];
}

interface SubNavList {
  name: string;
  link: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, link: "/", subNav: [] },
  { name: "Organization", icon: FiUsers, link: "/organization", subNav: [] },
  {
    name: "Visitor",
    icon: FiBox,
    link: "/visitor",
    subNav: [
      {
        name: "Visitor Log",
        link: "/visitor",
      },
      {
        name: "Invites",
        link: "/visitor/invites",
      },
      {
        name: "Analytics",
        link: "/visitor/analytics",
      },
    ],
  },
  {
    name: "Desk",
    icon: FiBox,
    link: "/desk",
    subNav: [
      {
        name: "Area",
        link: "/desk/area",
      },
      {
        name: "Analytics",
        link: "/desk/analytics",
      },
    ],
  },
  {
    name: "Room",
    icon: FiBox,
    link: "/room",
    subNav: [
      {
        name: "Analytics",
        link: "/room/analytics",
      },
    ],
  },
  {
    name: "Setting",
    icon: FiSettings,
    link: "/Setting",
    subNav: [],
  },
];
// <Box w="100%" h="200px" bgGradient="linear(to-b, #F65DE3,#3952EE)" />;

const SideBar: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      px="10%"
      pt="12"
      bg={useColorModeValue("#fcfcfc", "gray.900")}
    >
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
      <Box
        minH="100vh"
        ml={{ base: 0, md: 60 }}
        p="4"
        pt="20"
        bg={useColorModeValue("white", "gray.900")}
        rounded={"lg"}
      >
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log(location);
  return (
    <Box w={{ base: "full", md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Bonjour
          <ColorModeSwitcher />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          name={link.name}
          icon={link.icon}
          link={link.link}
          subNav={link.subNav}
          active={location.pathname === link.link}
        />
      ))}
      <NavItem
        color="red.500"
        icon={FiLogOut}
        name={"Log Out"}
        link={`#`}
        onClick={() => {
          dispatch(logout());
        }}
        subNav={[]}
        active={false}
      />
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  name: string;
  subNav: SubNavList[];
  active: boolean;
}
const NavItem = ({
  icon,
  link,
  name,
  active,
  subNav,
  ...rest
}: NavItemProps) => {
  const location = useLocation();
  const history = useHistory();
  let showNav = subNav.find((nav) => nav.link === location.pathname) || active;
  return (
    <Stack pt="1">
      <Box
        onClick={() => history.push(link)}
        style={{ textDecoration: "none", outline: "none" }}
      >
        <Flex
          align="center"
          p="3"
          mx="5"
          borderRadius="lg"
          fontWeight="500"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "blue.500",
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
          {name}
        </Flex>
      </Box>
      {showNav &&
        subNav.map((nav: SubNavList) => {
          return (
            <Box
              onClick={() => history.push(nav.link)}
              style={{ textDecoration: "none", outline: "none" }}
            >
              <Flex
                align="center"
                mx="20"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                  color: "blue.500",
                }}
                color={nav.link === location.pathname ? "blue.500" : "#676D7C"}
                fontWeight={nav.link === location.pathname ? "500" : "400"}
              >
                {nav.name}
              </Flex>
            </Box>
          );
        })}
    </Stack>
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
        LOGO HERE
      </Text>
    </Flex>
  );
};

export default SideBar;
