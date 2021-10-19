import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Heading,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react"
import type { NextPage } from "next"

import {
  useFormResponses,
  useListForms,
  useListResponses,
} from "../../hooks/forms"

import Link from "../../components/Link"
import NotAuthorized from "../../components/NotAuthorized"

const NumberResponses = ({ id }) => {
  const { isLoading, error, data } = useFormResponses(id)
  console.log("res", data)

  if (isLoading) {
    return <div>...</div>
  }
  return <div>{data?.length}</div>
}

const FormsListPage: NextPage = () => {
  const { isLoading, error, data = [], refetch } = useListForms()

  console.log(data)
  if (error?.message.includes("not authenticated")) {
    // return <NotAuthorized retry={refetch} />
  }
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
                  <Td isNumeric>{form.created}</Td>
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
    </Box>
  )
}

export default FormsListPage
