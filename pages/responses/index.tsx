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
  SkeletonText,
} from "@chakra-ui/react"

import { useListResponses } from "../../hooks/forms"

import { useRouter } from "next/router"

import Link from "../../components/Link"
import Container from "../../components/Container"

const UserResponsesPage = () => {
  const router = useRouter()
  //   const { isLoading, error, data = [] } = useListForms()
  const { isLoading, error, data = [] } = useListResponses(router.query.id)
  console.log(data)
  // if (isLoading) {
  //   return "loading..."
  // }
  return (
    <Container>
      <Heading size="md" mb={16}>
        Responses
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Form</Th>
            <Th>Created</Th>
            <Th>Data</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td>
                <SkeletonText noOfLines={1} />
              </Td>
              <Td>
                <SkeletonText noOfLines={1} />
              </Td>
              <Td>
                <SkeletonText noOfLines={1} />
              </Td>
            </Tr>
          ) : (
            data.map((response, id) => {
              // const id = form.id
              return (
                <Tr key={id}>
                  <Td>
                    <Link
                      href={`/forms/${response.content.formId}`}
                      color={"blue.500"}
                    >
                      {response.content.formId}
                    </Link>
                  </Td>
                  <Td>{response.content.created}</Td>
                  <Td>
                    <Textarea sx={{ fontFamily: "monospace" }} fontSize={"xs"}>
                      {JSON.stringify(
                        JSON.parse(response.content.data),
                        null,
                        2
                      )}
                    </Textarea>
                  </Td>
                </Tr>
              )
            })
          )}
        </Tbody>
      </Table>
    </Container>
  )
}

export default UserResponsesPage
