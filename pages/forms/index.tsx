import { Table, Thead, Tr, Th, Tbody, Td, Box, Heading } from "@chakra-ui/react"
import type { NextPage } from "next"

import { useListForms, useListResponses } from "../../hooks/forms"

import Link from "../../components/Link"

const FormsListPage: NextPage = () => {
  const { isLoading, error, data = [] } = useListForms()
  const responses = useListResponses()
  console.log("forms", data, responses.data)
  return (
    <Box w="100%">
      <Heading size="md" mb={16}>
        My Forms
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th isNumeric>Created</Th>
            <Th isNumeric># Responses</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((form) => {
            const id = form.id
            return (
              <Tr key={id}>
                <Td>
                  <Link href={`/forms/${id}`}>{form.title || ""}</Link>
                </Td>
                <Td>{form.created}</Td>
                <Td>{"0"}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default FormsListPage
