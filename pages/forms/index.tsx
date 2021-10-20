import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Flex,
  Heading,
  Skeleton,
  Spinner,
  SkeletonText,
} from "@chakra-ui/react"
import type { NextPage } from "next"

import {
  useFormResponses,
  useListForms,
  useListResponses,
} from "../../hooks/forms"

import Container from "../../components/Container"
import Link from "../../components/Link"
import NotAuthorized from "../../components/NotAuthorized"

const NumberResponses = ({ id }) => {
  const { isLoading, error, data } = useFormResponses(id)

  console.log("nrResponses", id, data)
  if (isLoading) {
    return (
      <Flex justifyContent="flex-end">
        <SkeletonText noOfLines={1} width={5} />
      </Flex>
    )
  }
  return <div>{Object.keys(data || {}).length}</div>
}

const FormsListPage: NextPage = () => {
  const { isLoading, error, data = [], refetch } = useListForms()

  console.log(data)
  return (
    <Container>
      <Heading size="md" mb={8}>
        My Forms
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th isNumeric>Created at</Th>
            <Th isNumeric># Responses</Th>
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
            data.map((form) => {
              const id = form.id
              return (
                <Tr key={id}>
                  <Td>
                    <Link href={`/forms/${id}`} color={"blue.500"}>
                      {form.title || ""}
                    </Link>
                  </Td>
                  <Td isNumeric>{new Date(form.created).toLocaleString()}</Td>
                  <Td isNumeric>
                    <NumberResponses id={id} />
                  </Td>
                  <Td>
                    <Link href={`/forms/${id}/responses`} color="blue.500">
                      View responses
                    </Link>
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

export default FormsListPage
