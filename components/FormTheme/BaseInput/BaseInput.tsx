import React from "react"
import { Input, InputProps } from "@chakra-ui/react"
import PropTypes from "prop-types"
import { WidgetProps } from "@rjsf/core"
import { JSONSchema7, JSONSchema7Object, JSONSchema7Array } from "json-schema"

type TWidgetProps = WidgetProps & {
  schema: JSONSchema7 & {
    examples:
      | string
      | number
      | boolean
      | JSONSchema7Object
      | JSONSchema7Array
      | string[]
      | any
  }
}

type ExtInputProps = InputProps & {
  list: string | undefined
  // onChange: any;
  // onBlur: any;
  // onFocus: any;
}

type TBaseInput = TWidgetProps & ExtInputProps

const BaseInput: React.FC<TBaseInput> = ({ id, ...props }) => {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  if (!id) {
    throw new Error(`no id for props ${JSON.stringify(props)}`)
  }
  const {
    value,
    readonly,
    disabled,
    autofocus,
    onBlur,
    onFocus,
    options,
    schema,
    ..._inputProps
  } = props

  interface IInput extends WidgetProps {
    type: any
    step: string | number
    autoComplete: any
    min: string | number
    max: string | number
  }
  const inputProps: Partial<IInput> = _inputProps

  // If options.inputType is set use that as the input type
  if (options.inputType) {
    inputProps.type = options.inputType
  } else if (!inputProps.type) {
    // If the schema is of type number or integer, set the input type to number
    if (schema.type === "number") {
      inputProps.type = "number"
      // Setting step to 'any' fixes a bug in Safari where decimals are not
      // allowed in number inputs
      inputProps.step = "any"
    } else if (schema.type === "integer") {
      inputProps.type = "number"
      // Since this is integer, you always want to step up or down in multiples
      // of 1
      inputProps.step = "1"
    } else {
      inputProps.type = "text"
    }
  }

  if (options.autocomplete) {
    inputProps.autoComplete = options.autocomplete
  }

  // If multipleOf is defined, use this as the step value. This mainly improves
  // the experience for keyboard users (who can use the up/down KB arrows).
  if (schema.multipleOf) {
    inputProps.step = schema.multipleOf
  }

  if (typeof schema.minimum !== "undefined") {
    inputProps.min = schema.minimum
  }

  if (typeof schema.maximum !== "undefined") {
    inputProps.max = schema.maximum
  }

  const _onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    return props.onChange(value === "" ? options.emptyValue : value)
  }

  return (
    <>
      <Input
        key={inputProps.id}
        className="form-control"
        isReadOnly={readonly}
        isDisabled={disabled}
        autoFocus={autofocus}
        value={value == null ? "" : value}
        {...inputProps}
        list={schema.examples ? `examples_${inputProps.id}` : undefined}
        onChange={_onChange}
        onBlur={
          onBlur &&
          ((event) => onBlur(inputProps.id as string, event.target.value))
        }
        onFocus={
          onFocus &&
          ((event) => onFocus(inputProps.id as string, event.target.value))
        }
      />
      {schema.examples ? (
        <datalist id={`examples_${inputProps.id}`}>
          {Array.from(
            new Set(
              schema.examples.concat(schema.default ? [schema.default] : [])
            )
          ).map((example: any) => (
            <option key={example} value={example} />
          ))}
        </datalist>
      ) : null}
    </>
  )
}

export default BaseInput
