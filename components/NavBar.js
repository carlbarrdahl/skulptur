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
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react"

import NextLink from "next/link"
import { useState } from "react"
import { useLogin, useSeedLogin } from "../hooks/auth"

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
  const [seed, setSeed] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const seedLogin = useSeedLogin()
  const walletLogin = useLogin()
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
          {!(seedLogin.isAuthenticated || walletLogin.isAuthenticated) ? (
            <Menu>
              <MenuButton>
                <Button>Login</Button>
              </MenuButton>
              <MenuList>
                <chakra.ul px={6} sx={{ listStyle: "none" }}>
                  <chakra.li
                    onClick={(e) => seedLogin.login(e.target.textContent)}
                    sx={{ _hover: { opacity: 0.5, cursor: "pointer" } }}
                  >
                    556fa1ca897aa822f2ffb60e23813e21e42089abb375f437244922afe131e76c
                  </chakra.li>
                  <chakra.li
                    onClick={(e) => seedLogin.login(e.target.textContent)}
                    sx={{ _hover: { opacity: 0.5, cursor: "pointer" } }}
                  >
                    da44b1b11005e27453b3010861cb578d8603c5d6a360bb029685ee0a4f66b3cc
                  </chakra.li>
                </chakra.ul>
                <InputGroup
                  as={"form"}
                  onSubmit={() => seedLogin.login(seed)}
                  px={4}
                >
                  <Input
                    autoFocus
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    placeholder="Enter seed"
                  />
                </InputGroup>
                <Flex justifyContent="flex-end" p={4}>
                  <Button onClick={walletLogin.login}>
                    Sign in with Metamask
                  </Button>
                </Flex>
              </MenuList>
            </Menu>
          ) : (
            <Avatar bg="gray.600" name={"U"} size="sm" />
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
