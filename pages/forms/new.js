import { Button, Box, Heading, Text, Flex, Textarea } from "@chakra-ui/react"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import SchemaForm from "../../components/SchemaForm"
import { useCreateForm } from "../../hooks/forms"

const initialSchema = {
  title: "Skulptur Form Example",
  description: `This is an example of how a form could look like. You can edit the form to the left and immediately see the changes reflected here.

When you click Create Form in the NavBar, a share will be given to send to your friends.`,
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: { type: "boolean", title: "Done?", default: false },
  },
}
// Add Quicktype to enable import or convert js object
export default function NewFormPage() {
  const router = useRouter()
  const { mutateAsync: createForm } = useCreateForm()
  const [schema, setSchema] = useState(JSON.stringify(initialSchema, null, 2))

  function handleChange(e) {
    console.log("Updating schema")
    setSchema(e.target.value)
  }

  const handleCreateForm = (data) => {
    createForm(data).then((id) => {
      console.log("navigating to view form page", id)
      return router.push(`/forms/${id}`)
    })
  }

  return (
    <>
      <Button onClick={() => handleCreateForm(JSON.parse(schema))}>
        Create Form
      </Button>

      <Flex flex={1} minW="100%" height={400}>
        <Box width={["100%"]}>
          <Heading
            size="xs"
            textTransform="uppercase"
            letterSpacing="wider"
            color="gray.500"
          >
            Editor
          </Heading>
          <Textarea
            style={{ fontFamily: "monospace" }}
            width="100%"
            height="100%"
            onChange={handleChange}
            value={schema}
          ></Textarea>
        </Box>
        <Box width={["100%"]} pl={4}>
          <Heading
            size="xs"
            textTransform="uppercase"
            letterSpacing="wider"
            color="gray.500"
          >
            Preview
          </Heading>
          <FormWithError
            schema={schema}
            onChange={() => console.log("changed")}
            onSubmit={() => console.log("submitted")}
            onError={() => console.log("errors")}
          >
            {" "}
          </FormWithError>
        </Box>
      </Flex>
    </>
  )
}

function FormWithError({ schema, ...props }) {
  const [schemaJSON, setJSON] = useState({})
  const [error, setError] = useState(null)
  useEffect(() => {
    try {
      const json = JSON.parse(schema)
      setJSON(json)
      setError(null)
    } catch (error) {
      setError(error)
    }
  }, [schema])

  return error ? (
    <pre>{error.toString()}</pre>
  ) : (
    <SchemaForm schema={schemaJSON} {...props} />
  )
}
