// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import { CeramicClient } from "@ceramicnetwork/http-client"
import { DataModel } from "@glazed/datamodel"
import { DIDDataStore } from "@glazed/did-datastore"
import { DID } from "dids"
import { Ed25519Provider } from "key-did-provider-ed25519"
import { getResolver } from "key-did-resolver"
import { fromString } from "uint8arrays"

import dotenv from "dotenv"

import modelAliases from "../../ceramic/model"

dotenv.config()

// The seed must be provided as an environment variable
const seed = fromString(process.env.SEED, "base16")
// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(seed),
  resolver: getResolver(),
})

// Connect to the local Ceramic node
const ceramic = new CeramicClient("http://localhost:7007")
ceramic.did = did

const model = new DataModel({ ceramic, model: modelAliases })
const store = new DIDDataStore({ ceramic, model })

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { formId, responseId } = req.body

  await did.authenticate()

  return store.get("formResponses").then((doc) => {
    const responses = doc || {}

    console.log("responses", responses)
    return store
      .set("formResponses", {
        [formId]: {
          ...responses[formId],
          [responseId]: responseId,
        },
      })
      .then((doc) => {
        console.log("successfully updated", doc)
        return res.status(201).json({ status: "success", data: responses })
      })
  })

  res.status(200).json({ name: "John Doe" })
}
