import { TileDocument } from "@ceramicnetwork/stream-tile"
import { EthereumAuthProvider, WebClient } from "@self.id/web"
import { ModelManager } from "@glazed/devtools"
import { DID } from "dids"
import { Ed25519Provider } from "key-did-provider-ed25519"
import { getResolver } from "key-did-resolver"
import { fromString } from "uint8arrays"

import model from "./model.json"

const NETWORK_CONFIGS = {
  "dev-unstable": {
    ceramicURL: "https://ceramic-private-dev.3boxlabs.com",
    connectNetwork: "dev-unstable",
  },
  "local-clay": {
    // ceramicURL: "https://gateway.ceramic.network",
    ceramicURL: "http://localhost:7007",
    connectNetwork: "testnet-clay",
  },
  "testnet-clay": {
    ceramicURL: "https://ceramic-clay.3boxlabs.com",
    // ceramicURL: "https://ceramic-private-clay.3boxlabs.com",
    connectNetwork: "testnet-clay",
  },
  mainnet: {
    ceramicURL: "https://ceramic-private.3boxlabs.com",
    connectNetwork: "mainnet",
  },
}

const CERAMIC_URL = NETWORK_CONFIGS["testnet-clay"].ceramicURL
const CONNECT_NETWORK = NETWORK_CONFIGS["testnet-clay"].connectNetwork

export async function createSelfIDClient() {
  const client = new WebClient({
    ceramic: CERAMIC_URL,
    connectNetwork: CONNECT_NETWORK,
    model,
  })

  // const authProvider = new EthereumAuthProvider(provider, address)
  // const did = await client.authenticate(authProvider, true)

  const seed = fromString(
    "556fa1ca897aa822f2ffb60e23813e21e42089abb375f437244922afe131e76c",
    // "da44b1b11005e27453b3010861cb578d8603c5d6a360bb029685ee0a4f66b3cc",
    // "8df07fcd7f0d251137e110e60690e83f4e53e1028d43bd6c8fbd05dbfbf08f66",
    "base16"
  )
  // Create and authenticate the DID
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: getResolver(),
  })
  await did.authenticate()

  client.ceramic.did = did

  const manager = new ModelManager(client.ceramic)
  client.manager = manager

  window.client = client
  window.model = model
  window.TileDocument = TileDocument

  return client
}
