import { useMutation, useQuery } from "react-query"

import { TileDocument } from "@ceramicnetwork/stream-tile"

import { useCeramic } from "../providers/ceramic"

import model from "../ceramic/model.json"

export function useCreateForm() {
  const { ceramic, manager, dataModel, dataStore } = useCeramic()

  return useMutation(async (schema: any) => {
    console.log("creating form with schema:", schema)

    const doc = await TileDocument.create(ceramic, schema)
    await ceramic.pin.add(doc.id)
    console.log("schema created", doc.id)
    const schemaURI = doc.id.toString()
    const created = new Date().toISOString()
    console.log("form created with schemaURI:", schemaURI)
    return Promise.all([
      dataModel.createTile("Form", {
        title: schema.title,
        description: schema.description,
        created,
        schemaURI,
      }),
      dataStore.get("forms"),
    ])
      .then(async ([doc, formsList]) => {
        console.log("form doc created", doc)
        const formId = doc.id.toString()
        console.log("appending form definition", formsList)
        await dataStore.set("forms", {
          forms: [
            {
              id: formId,
              title: schema.title,
              created,
            },
            ...(formsList?.forms ?? []),
          ],
        })

        console.log("form successfully created")
        return formId
      })
      .catch((err: Error) => {
        console.log("form failed to create", err)
      })
  })
}

export function useListForms() {
  const { dataStore } = useCeramic()

  return useQuery("listForms", () => {
    console.log("listing forms")
    return dataStore
      .get("forms")
      .then((formsList: any) => formsList?.forms ?? [])
  })
}

export function useViewForm(id: any) {
  const { ceramic } = useCeramic()

  return useQuery(["forms", id], () => {
    console.log("loading form:", id)
    return TileDocument.load(ceramic, id).then((doc: any) => {
      console.log("loading schema:", doc.content.schemaURI)
      return TileDocument.load(ceramic, doc.content.schemaURI).then(
        (schema) => ({
          ...doc.content,
          schema: schema.content,
        })
      )
    })
  })
}

export function useCreateResponse() {
  const { dataModel, dataStore } = useCeramic()

  return useMutation(({ formId, data }: any) => {
    console.log("creating response", formId, data)

    return Promise.all([
      dataModel.createTile("Response", {
        formId,
        data,
        created: new Date().toISOString(),
      }),
      dataStore.get("responses"),
    ])
      .then(async ([doc, responsesList]) => {
        console.log("response doc created", doc)
        const id = doc.id.toString()
        console.log("appending responses to definition", responsesList)

        console.log("asd", id, formId)
        await dataStore.set("responses", {
          responses: [
            {
              id,
              formId,
            },
            ...(responsesList?.responses ?? []),
          ],
        })

        return fetch(`/api/responses`, {
          method: "POST",
          body: JSON.stringify({ formId, responseId: id }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log("response successfully created", res)
            return res
          })
      })
      .catch((err: Error) => {
        console.log("response failed to create", err)
      })
  })
}

export function useFormResponses(formId: any) {
  const { ceramic, dataStore } = useCeramic()
  return useQuery("formResponses", () => {
    console.log("loading server form responses", model.did)
    return dataStore.get("formResponses", model.did).then((doc) => {
      console.log("form responses", doc, formId, doc[formId])
      // return doc
      return Promise.all(
        Object.keys(doc[formId] || {}).map((id) =>
          TileDocument.load(ceramic, id).then((doc) => {
            console.log("response", doc)
            return doc.state
          })
        )
      )
    })
  })
}

export function useListResponses(formId: any) {
  const { ceramic, dataStore } = useCeramic()
  return useQuery("responses", () => {
    console.log("loading user responses")
    return dataStore.get("responses").then((doc) => {
      console.log("responses", doc)

      return Promise.all(
        (doc?.responses || []).map(({ id }) =>
          TileDocument.load(ceramic, id).then((doc) => doc.state)
        )
      )
    })
  })
}
