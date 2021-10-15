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
    ceramicURL: "https://gateway-clay.ceramic.network",
    // ceramicURL: "https://ceramic-private-clay.3boxlabs.com",
    connectNetwork: "testnet-clay",
  },
  mainnet: {
    ceramicURL: "https://ceramic-private.3boxlabs.com",
    connectNetwork: "mainnet",
  },
}

const CERAMIC_URL = NETWORK_CONFIGS["local-clay"].ceramicURL
const CONNECT_NETWORK = NETWORK_CONFIGS["local-clay"].connectNetwork

const state = {
  // Contains mapping for responses to forms
  server: {
    form_responses: {
      ["formId"]: {
        responses: ["idA", "idB"], // Could also store userId? What benefit would that have?
      },
    },
  },
  formCreator: {
    /// forms: [idA, idB, ...],
    forms: [
      {
        id: "formId",
        title: "Example Form",
        created: "",
        schemaURI: "ceramic://...",
      },
    ],
  },
  submitter: {
    //   responses: {
    //       ["formId"]: "responseId"
    //   },
    // responses: [idA, idB, ...],
    responses: {
      ["id"]: {
        created: "",
        form: "formId",
        data: {},
      },
    },
  },
}

export async function createSelfIDClient() {
  const client = new WebClient({
    ceramic: CERAMIC_URL,
    connectNetwork: CONNECT_NETWORK,
    model,
  })

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

  return client
}

// export async function authenticate() {}

// export async function createForm(schema, ceramic) {
//   const schemaURI = await ceramic.manager.createSchema(schema.title, schema)

//   return ceramic.model
//     .createTile("Form", {
//       title: schema.title,
//       description: schema.description,
//       created: new Date().toISOString(),
//       schemaURI,
//     })
//     .then(async (doc) => {
//       const formId = doc.id.toUrl()
//       await store.merge("forms", { [formId]: formId })

//       return formId
//     })
// }

// export async function createResponse({ formId, data }) {
//   model
//     .createTile("Response", { created: new Date().toISOString(), data })
//     .then(async (doc) => {
//       const responseId = doc.id.toUrl()
//       await store.merge("responses", { [formId]: responseId })

//       return responseId
//     })
// }

// export async function getForm(formId) {
//   return TileDocument.load(ceramic, formId)
// }

// export async function getResponse(formId) {
//   return store.get("responses").then((res) => {
//     return Promise.all(res?.[formId] ?? []).map((id) =>
//       TileDocument.load(ceramic, id)
//     )
//   })
// }

// const SERVER_DID = ""
// export async function getResponses(formId) {
//   return store.get("form_responses", SERVER_DID).then((res) => {
//     return res?.[formId]
//   })
// }

// // Move to pages/api/
// export async function pushResponse(formId, responseId) {
//   return store.get("form_responses").then((responses) => {
//     const current = responses?.[formId]
//     return store.merge({ [formId]: [responseId, ...current] })
//   })
// }
