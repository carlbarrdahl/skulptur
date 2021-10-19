import { EthereumAuthProvider } from "@3id/connect"
import { useMultiAuth } from "@ceramicstudio/multiauth"
import { useState } from "react"
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

    console.log("auth", did.authenticated)
    setAuthenticated(did.authenticated)
    // console.log(eth, ceramic)
    // await ceramic.authenticate()
  }

  return { login, isAuthenticated }
}
