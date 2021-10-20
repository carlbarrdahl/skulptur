import { Box, Heading, Text } from "@chakra-ui/layout"
import Container from "../../../components/Container"

export default function ThanksPage() {
  return (
    <Container>
      <Box>
        <Heading mb={4}>Thank you!</Heading>
        <Text>Your response has been saved.</Text>
      </Box>
    </Container>
  )
}
