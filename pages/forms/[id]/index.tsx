import { useRouter } from "next/router"

import { useViewForm, useCreateResponse } from "../../../hooks/forms"

import SchemaForm from "../../../components/SchemaForm"
import { Button } from "@chakra-ui/button"

export default function ViewFormPage() {
  const router = useRouter()
  const formId = router.query.id
  const { isLoading, error, data } = useViewForm(formId)
  const { mutateAsync: createResponse } = useCreateResponse()

  if (isLoading) {
    return "loading..."
  }
  if (error) {
    return <pre>{error.toString()}</pre>
  }
  console.log(isLoading, error, data)

  function handleSubmit(data) {
    console.log(data.formData)
    createResponse({
      formId,
      data: JSON.stringify(data.formData),
    })
  }
  return (
    <div>
      <SchemaForm schema={data.schema} onSubmit={handleSubmit}>
        <Button type="submit">Submit</Button>
      </SchemaForm>
    </div>
  )
}
