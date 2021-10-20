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
import NotAuthorized from "../../components/NotAuthorized"

const UserResponsesPage = () => {
  const router = useRouter()
  const {
    isLoading,
    error,
    data = [],
    refetch,
  } = useListResponses(router.query.id)

  return (
    <Container>
      <Heading size="md" mb={8}>
        My Responses
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Form id</Th>
            <Th>Created at</Th>
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
          ) : error?.message.includes("not authenticated") ? (
            <Tr>
              <Td colSpan={3}>
                <NotAuthorized retry={refetch} />
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
                  <Td>{new Date(response.content.created).toLocaleString()}</Td>
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
