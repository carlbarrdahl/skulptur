import {
  Divider,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Heading,
  IconButton,
  Flex,
  Textarea,
  Text,
  Button,
  SkeletonText,
} from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

import { useViewForm, useFormResponses } from "../../../hooks/forms"

import Link from "../../../components/Link"
import NotAuthorized from "../../../components/NotAuthorized"
import { useRouter } from "next/router"
import Container from "../../../components/Container"
import SchemaForm from "../../../components/SchemaForm"
import { useState } from "react"

const FormResponsesPage = () => {
  const router = useRouter()
  const res = useFormResponses(router.query.id)
  const { isLoading, error, data } = useViewForm(router.query.id)

  const [selected, setSelected] = useState(1)

  function handleSelect(value) {
    setSelected(value)
  }
  console.log("responses", res.data)
  return (
    <Container>
      <Flex justifyContent="flex-end"></Flex>
      <Box mb={8}>
        <Flex justifyContent="space-between">
          <Heading size="md" mb={4}>
            Responses for {data?.title}
          </Heading>
          <Flex alignItems="center" mb={4}>
            <IconButton
              aria-label="Previous response"
              icon={<ChevronLeftIcon />}
              disabled={selected === 1}
              onClick={() => handleSelect(selected - 1)}
            />

            <Text px={8}>
              Response {selected} of {res?.data?.length}
            </Text>
            <IconButton
              aria-label="Next response"
              icon={<ChevronRightIcon />}
              disabled={selected === res?.data?.length}
              onClick={() => handleSelect(selected + 1)}
            />
          </Flex>
          <Button onClick={() => alert("not implemented")}>Export CSV</Button>
        </Flex>
        {!isLoading && res.data ? (
          <SchemaForm
            schema={data?.schema}
            formData={JSON.parse(res.data[selected - 1]?.content?.data)}
            onSubmit={console.log}
          >
            {" "}
          </SchemaForm>
        ) : (
          "..."
        )}
      </Box>
      <Divider mb={8} />
      <Heading size={"md"}>All responses</Heading>
      <Table mb={16}>
        <Thead>
          <Tr>
            <Th>DID</Th>
            <Th>Created</Th>
            <Th>Data</Th>
          </Tr>
        </Thead>
        <Tbody>
          {res.isLoading ? (
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
          ) : res.error?.message.includes("not authenticated") ? (
            <Tr>
              <Td colSpan={3}>
                <NotAuthorized retry={res.refetch} />
              </Td>
            </Tr>
          ) : (
            (res.data || []).map((response, id) => {
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
