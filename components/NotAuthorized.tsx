import { Flex, Box, Text, Heading, Button } from "@chakra-ui/react"

export default function NotAuthorized({ retry }) {
  return (
    <Flex justifyContent="center">
      <Box p={8}>
        <Heading mb={2} fontSize={"xl"}>
          Not authorized
        </Heading>
        <Text mb={4} fontSize={"lg"}>
          Ceramic couldn&apos;t authorize. Try logging in and retry
        </Text>
        <Button onClick={retry}>Retry</Button>
      </Box>
    </Flex>
  )
}
