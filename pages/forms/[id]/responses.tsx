import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Heading,
  Textarea,
} from "@chakra-ui/react"

import { useViewForm, useFormResponses } from "../../../hooks/forms"

import Link from "../../../components/Link"
import { useRouter } from "next/router"

const Header = () => {
  const router = useRouter()
  const formId = router.query.id || ""
  const { isLoading, error, data } = useViewForm(formId)
  console.log({ data })
  return (
    <Heading size="md" mb={16}>
      Responses for {data?.title}
    </Heading>
  )
}
const FormResponsesPage = () => {
  const router = useRouter()
  //   const { isLoading, error, data = [] } = useListForms()
  const { isLoading, error, data = [] } = useFormResponses(router.query.id)
  console.log(data)
  if (isLoading) {
    return "loading..."
  }
  return (
    <Box w="100%">
      <Header />
      <Table>
        <Thead>
          <Tr>
            <Th>DID</Th>
            <Th>Created</Th>
            <Th>Data</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((response, id) => {
            // const id = form.id
            return (
              <Tr key={id}>
                <Td>{response.metadata.controllers[0]}</Td>
                <Td>{new Date(response.content.created).toLocaleString()}</Td>
                <Td>
                  <Textarea sx={{ fontFamily: "monospace" }} fontSize={"xs"}>
                    {JSON.stringify(JSON.parse(response.content.data), null, 2)}
                  </Textarea>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default FormResponsesPage
