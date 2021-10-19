import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Heading,
  Flex,
  Textarea,
  Button,
  SkeletonText,
} from "@chakra-ui/react"

import { useViewForm, useFormResponses } from "../../../hooks/forms"

import Link from "../../../components/Link"
import NotAuthorized from "../../../components/NotAuthorized"
import { useRouter } from "next/router"
import Container from "../../../components/Container"

const Header = () => {
  const router = useRouter()
  const formId = router.query.id || ""
  const { isLoading, error, data } = useViewForm(formId)

  return (
    <Heading size="md" mb={16}>
      Responses for {data?.title}
    </Heading>
  )
}
const FormResponsesPage = () => {
  const router = useRouter()
  const {
    isLoading,
    error,
    data = [],
    refetch,
  } = useFormResponses(router.query.id)

  console.log("errr", error)
  return (
    <Container>
      <Flex justifyContent="flex-end">
        <Button onClick={() => alert("not implemented")}>Export CSV</Button>
      </Flex>
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
              return (
                <Tr key={id}>
                  <Td>{response.metadata.controllers[0]}</Td>
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

export default FormResponsesPage
