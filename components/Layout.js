import Navbar from "./NavBar"
import { Container } from "@chakra-ui/react"
import Head from "next/head"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>skulptur</title>
        <meta
          name="description"
          content="Decentralized Google Forms built with Ceramic."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container as="main" maxW="container.xl" mt={8}>
        {children}
      </Container>
      {/* <Footer /> */}
    </>
  )
}
