import { Table, Thead, Tr, Th, Tbody, Td, Box, Heading } from "@chakra-ui/react"
import type { NextPage } from "next"

import {
  useFormResponses,
  useListForms,
  useListResponses,
} from "../../hooks/forms"

import Link from "../../components/Link"

const NumberResponses = ({ id }) => {
  const { isLoading, error, data } = useFormResponses(id)
  console.log("res", data)

  if (isLoading) {
    return <div>...</div>
  }
  return <div>{data?.length}</div>
}

const FormsListPage: NextPage = () => {
  const { isLoading, error, data = [] } = useListForms()

  console.log(data)
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
                  <Link href={`/forms/${id}`} color={"blue.500"}>
                    {form.title || ""}
                  </Link>
                </Td>
                <Td isNumeric>{form.created}</Td>
                <Td isNumeric>
                  <NumberResponses id={id} />
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default FormsListPage
