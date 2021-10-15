import { withTheme } from "@rjsf/core"

import * as ChakraComponents from "./FormTheme"

const FormComponent = withTheme(ChakraComponents.Theme as any)

export default function SchemaForm({ schema, ...props }) {
  return <FormComponent schema={schema} {...props} />
}
