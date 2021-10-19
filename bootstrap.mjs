import { writeFile } from "node:fs/promises"
import { CeramicClient } from "@ceramicnetwork/http-client"
import { ModelManager } from "@glazed/devtools"
import { DID } from "dids"
import { Ed25519Provider } from "key-did-provider-ed25519"
import { getResolver } from "key-did-resolver"
import { fromString } from "uint8arrays"

import dotenv from "dotenv"
dotenv.config()

// The seed must be provided as an environment variable
const seed = fromString(process.env.SEED, "base16")

// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(seed),
  resolver: getResolver(),
})
await did.authenticate()

console.log(did.id.toString())
// Connect to the local Ceramic node
const ceramic = new CeramicClient("http://localhost:7007")
ceramic.did = did

// Create a manager for the model
const manager = new ModelManager(ceramic)

// Create the schemas
const formSchemaID = await manager.createSchema("Form", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Form",
  type: "object",
  properties: {
    title: {
      type: "string",
      title: "title",
      maxLength: 100,
    },
    description: {
      type: "string",
      title: "description",
      maxLength: 4000,
    },
    schemaURI: {
      type: "string",
      title: "schema",
    },
    created: {
      type: "string",
      format: "date-time",
      title: "created",
      maxLength: 30,
    },
  },
})
const formsSchemaID = await manager.createSchema("Forms", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "FormList",
  type: "object",
  properties: {
    forms: {
      type: "array",
      title: "forms",
      items: {
        type: "object",
        title: "FormItem",
        properties: {
          id: {
            $comment: `cip88:ref:${manager.getSchemaURL(formSchemaID)}`,
            type: "string",
            // pattern: "^ceramic://.+(\\?version=.+)?",
            maxLength: 150,
          },
          title: {
            type: "string",
            title: "title",
            maxLength: 100,
          },
          created: {
            type: "string",
            format: "date-time",
            title: "created",
            maxLength: 30,
          },
        },
      },
    },
  },
})

const responseSchemaID = await manager.createSchema("Response", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Response",
  type: "object",
  properties: {
    formId: {
      title: "form id",
      type: "string",
      // pattern: "^ceramic://.+(\\?version=.+)?",
      maxLength: 150,
    },
    data: {
      title: "form response data",
      type: "string",
    },
    created: {
      type: "string",
      format: "date-time",
      title: "created",
      maxLength: 30,
    },
  },
})

const responsesSchemaID = await manager.createSchema("Responses", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "ResponseList",
  type: "object",
  properties: {
    responses: {
      type: "array",
      title: "responses",
      items: {
        type: "object",
        title: "ResponseItem",
        properties: {
          id: {
            $comment: `cip88:ref:${manager.getSchemaURL(responseSchemaID)}`,
            type: "string",
            // pattern: "^ceramic://.+(\\?version=.+)?",
            maxLength: 150,
          },
          formId: {
            title: "form id",
            type: "string",
            // pattern: "^ceramic://.+(\\?version=.+)?",
            maxLength: 150,
          },
        },
      },
    },
  },
})

const formResponsesSchemaID = await manager.createSchema("FormResponses", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "FormResponseList",
  type: "object",
  additionalProperties: { type: "object" },
  // properties: {
  //   formResponses: {
  //     type: "array",
  //     title: "form responses",
  //     items: {
  //       type: "object",
  //       title: "FormResponseItem",
  //       properties: {
  //         responseId: {
  //           title: "response id",
  //           type: "string",
  //           pattern: "^ceramic://.+(\\?version=.+)?",
  //           maxLength: 150,
  //         },
  //         formId: {
  //           title: "form id",
  //           type: "string",
  //           pattern: "^ceramic://.+(\\?version=.+)?",
  //           maxLength: 150,
  //         },
  //       },
  //     },
  //   },
  // },
})

console.log(manager.getSchemaURL(formsSchemaID))
// Create the definition using the created schema ID
await manager.createDefinition("forms", {
  name: "forms",
  description: "Collection of Forms",
  schema: manager.getSchemaURL(formsSchemaID),
})

await manager.createDefinition("responses", {
  name: "responses",
  description: "Collection of Responses",
  schema: manager.getSchemaURL(responsesSchemaID),
})

await manager.createDefinition("formResponses", {
  name: "formResponses",
  description: "Collection of Responses for Forms",
  schema: manager.getSchemaURL(formResponsesSchemaID),
})

// Create a Note with text that will be used as placeholder
await manager.createTile(
  "placeholderForm",
  {
    title: "Skulptur Form Example",
    description:
      "This is an example of how a form could look like. You can edit the form to the left and immediately see the changes reflected here.",
    created: new Date().toISOString(),
    schemaURI: formSchemaID,
  },
  { schema: manager.getSchemaURL(formSchemaID) }
)

// Write model to JSON file
const model = await manager.toPublished()
await writeFile(
  "./ceramic/model.json",
  JSON.stringify(
    {
      ...model,
      did: did.id.toString(),
    },
    null,
    2
  )
)

console.log("Model written to src/model.json file:", model)
