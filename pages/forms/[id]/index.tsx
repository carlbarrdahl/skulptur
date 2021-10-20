import { useRouter } from "next/router"
import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useViewForm, useCreateResponse } from "../../../hooks/forms"

import SchemaForm from "../../../components/SchemaForm"
import { Button } from "@chakra-ui/button"
import Container from "../../../components/Container"

export default function ViewFormPage() {
  const router = useRouter()
  const formId = router.query.id || ""
  const { isLoading, error, data }: any = useViewForm(formId)
  const { isLoading: isCreating, mutateAsync: createResponse } =
    useCreateResponse()

  if (isLoading) {
    // return "loading..."
  }
  if (isCreating) {
    // return "Submitting response..."
  }
  if (error) {
    return <pre>{error.toString()}</pre>
  }
  console.log(isLoading, error, data)

  function handleSubmit(data: any) {
    console.log(data.formData)
    createResponse({
      formId,
      data: JSON.stringify(data.formData),
    }).then(() => router.push(`/forms/${formId}/thanks`))
  }
  return (
    <Container>
      {isLoading ? (
        <Flex justifyContent="center">
          <Spinner mr={4} />
          <Text>Loading form...</Text>
        </Flex>
      ) : isCreating ? (
        <Flex justifyContent="center">
          <Spinner mr={4} />
          <Text>Submitting response...</Text>
        </Flex>
      ) : (
        <SchemaForm schema={data.schema} onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </SchemaForm>
      )}
    </Container>
  )
}
