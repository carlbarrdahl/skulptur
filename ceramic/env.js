import { TileDocument } from "@ceramicnetwork/stream-tile"
import { WebClient } from "@self.id/web"
import { ModelManager } from "@glazed/devtools"

import model from "./model.json"

import { ceramicURL, connectNetwork } from "../config"

export async function createSelfIDClient() {
  const client = new WebClient({
    ceramic: ceramicURL,
    connectNetwork: connectNetwork,
    model,
  })

  const manager = new ModelManager(client.ceramic)
  client.manager = manager

  window.client = client
  window.model = model
  window.TileDocument = TileDocument

  return client
}
