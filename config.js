// import dotenv from "dotenv"
// dotenv.config()

const NETWORK_CONFIGS = {
  "dev-unstable": {
    ceramicURL: "https://ceramic-private-dev.3boxlabs.com",
    connectNetwork: "dev-unstable",
  },
  "local-clay": {
    ceramicURL: "http://localhost:7007",
    connectNetwork: "testnet-clay",
  },
  "testnet-clay": {
    ceramicURL: "https://ceramic-clay.3boxlabs.com",
    connectNetwork: "testnet-clay",
  },
  mainnet: {
    ceramicURL: "https://ceramic-private.3boxlabs.com",
    connectNetwork: "mainnet",
  },
}

export const { ceramicURL, connectNetwork } = NETWORK_CONFIGS["testnet-clay"]
