import {
  Button,
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"

import type { NextPage } from "next"
import { useCreateForm, useListForms } from "../hooks/forms"

import NextLink from "next/link"

const Home: NextPage = () => {
  const { mutateAsync: createForm } = useCreateForm()
  const { isLoading, error, data } = useListForms()

  return (
    <div>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} justify={"center"}>
          <Box mt={8}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} mb={4}>
              <Text as={"span"} position={"relative"}>
                Decentralized Forms
              </Text>
            </Heading>
            <Text fontSize={{ base: "md", lg: "xl" }} color={"gray.500"} mb={8}>
              Create forms and surveys with json-schemas and share with your
              friends
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <NextLink href={"/forms/new"} passHref>
                <Button
                  bg="gray.800"
                  color={"gray.100"}
                  sx={{
                    _hover: {
                      bg: "gray.600",
                    },
                  }}
                >
                  Create Form
                </Button>
              </NextLink>
              <Button variant="outline">How It Works</Button>
            </Stack>
          </Box>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1542382257-80dedb725088?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1528&q=80"
            }
          />
        </Flex>
      </Stack>
    </div>
  )
}

export default Home
