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

import { useListForms, useListResponses } from "../../../hooks/forms"

import Link from "../../../components/Link"
import { useRouter } from "next/router"

const FormResponsesPage = () => {
  const router = useRouter()
  //   const { isLoading, error, data = [] } = useListForms()
  const { isLoading, error, data = [] } = useListResponses(router.query.id)
  console.log(data)
  if (isLoading) {
    return "loading..."
  }
  return (
    <Box w="100%">
      <Heading size="md" mb={16}>
        Responses
      </Heading>
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
                <Td>{response.content.created}</Td>
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
