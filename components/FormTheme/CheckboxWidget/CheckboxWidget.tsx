import { Checkbox } from "@chakra-ui/react"
import { WidgetProps } from "@rjsf/core"
import React from "react"
import DescriptionField from "../DescriptionField"

const CheckboxWidget = (props: WidgetProps) => {
  const { id, value, disabled, readonly, onChange, onBlur, onFocus } = props
  console.log("CHECKBOX", props)
  const _onChange = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => onChange(checked)
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, value)
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value)

  return (
    <>
      {props.schema.description && (
        <DescriptionField description={props.schema.description} />
      )}
      <Checkbox
        id={id}
        isChecked={typeof value === "undefined" ? false : value}
        isDisabled={disabled || readonly}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
      >
        {props.schema.title}
      </Checkbox>
    </>
  )
}

export default CheckboxWidget
