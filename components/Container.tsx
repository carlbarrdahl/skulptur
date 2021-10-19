import { Container as ChakraContainer } from "@chakra-ui/react"

export default function Container({ children }) {
  return (
    <ChakraContainer as="main" maxW="container.xl" mt={8}>
      {children}
    </ChakraContainer>
  )
}
