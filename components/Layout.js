import Navbar from "./NavBar"
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
      {children}
    </>
  )
}
