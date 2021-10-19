import {
  Avatar,
  chakra,
  Button,
  Heading,
  Flex,
  Link,
  HStack,
  Stack,
  Box,
  Spacer,
  Menu,
  MenuItem,
  MenuDivider,
  MenuButton,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"

import NextLink from "next/link"
import { useLogin } from "../hooks/auth"

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
    }}
    href={"#"}
  >
    {children}
  </Link>
)

const NavBarLink = ({ children, href }) => {
  return (
    <NextLink href={href} passHref>
      <Button
        as="a"
        variant="ghost"
        color="white"
        sx={{
          outline: "none",
          _hover: {
            bg: "gray.700",
          },
        }}
        mr={8}
      >
        {children}
      </Button>
    </NextLink>
  )
}

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { login, isAuthenticated } = useLogin()

  return (
    <Flex p={4} bg={"gray.900"}>
      <Flex p="2" alignItems="center">
        <Heading size="md" color={"white"} mr={16}>
          <Link as={NextLink} href="/">
            skulptur
          </Link>
        </Heading>
      </Flex>
      <Spacer />
      <Flex alignItems="center">
        <NavBarLink href={"/forms/new"}>New Form</NavBarLink>
        <NavBarLink href={"/forms"}>My Forms</NavBarLink>
        <NavBarLink href={"/responses"}>My Responses</NavBarLink>
        <Box>
          {false && !isAuthenticated ? (
            <Button onClick={login}>Login</Button>
          ) : (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar bg="gray.100" name="Carl" />
              </MenuButton>
              <MenuList>
                <MenuItem>My Forms</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Flex>
  )
}
