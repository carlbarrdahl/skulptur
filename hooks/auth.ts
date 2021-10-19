import { EthereumAuthProvider } from "@3id/connect"
import { useMultiAuth } from "@ceramicstudio/multiauth"
import { useState } from "react"
import { DID } from "dids"
import { Ed25519Provider } from "key-did-provider-ed25519"
import { getResolver } from "key-did-resolver"
import { fromString } from "uint8arrays"

import { useCeramic } from "../providers/ceramic"

export function useLogin() {
  const [authState, connect] = useMultiAuth()
  const [isAuthenticated, setAuthenticated] = useState(false)
  const ceramic = useCeramic()
  async function login() {
    const eth = await connect({ mode: "force" })

    const { provider, account } = eth.provider.state
    const authProvider = new EthereumAuthProvider(provider, account)
    const did = await ceramic.authenticate(authProvider, true)

    ceramic.did = did
    console.log("auth", did.authenticated)
    setAuthenticated(did.authenticated)

    // await ceramic.authenticate()
  }

  return { login, isAuthenticated }
}

export function useSeedLogin() {
  const ceramic = useCeramic()
  const [isAuthenticated, setAuthenticated] = useState(false)

  async function login(seed) {
    // Create and authenticate the DID
    const did = new DID({
      provider: new Ed25519Provider(fromString(seed, "base16")),
      resolver: getResolver(),
    })
    console.log("authenticating...")
    await did.authenticate()

    // ceramic.did = did
    ceramic.ceramic.did = did

    console.log("authenticated", did.id.toString())
    setAuthenticated(did.authenticated)
  }

  return { login, isAuthenticated }
}
