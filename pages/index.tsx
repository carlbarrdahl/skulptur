import { Button } from "@chakra-ui/button"

import type { NextPage } from "next"
import Head from "next/head"
import { useCreateForm, useListForms } from "../hooks/forms"

const Home: NextPage = () => {
  const { mutateAsync: createForm } = useCreateForm()
  const { isLoading, error, data } = useListForms()
  console.log(isLoading, error, data)
  function handleCreateForm() {
    console.log("create form")
    createForm({
      title: "Skulptur Form Example 3",
      description: `This is an example of how a form could look like. You can edit the form to the left and immediately see the changes reflected here.
    
    When you click Create Form in the NavBar, a share will be given to send to your friends.`,
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string", title: "Title", default: "A new task" },
        done: { type: "boolean", title: "Done?", default: false },
      },
    })
  }
  function handleListForms() {
    console.log("list forms")
  }
  return (
    <div>
      <Button onClick={handleCreateForm}>Create Form</Button>
      <Button onClick={handleListForms}>List Forms</Button>
    </div>
  )
}

export default Home
