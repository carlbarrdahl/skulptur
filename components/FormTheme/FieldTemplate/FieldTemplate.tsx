import React from "react";
import {
  FormHelperText,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { FieldTemplateProps } from "@rjsf/core";

const FieldTemplate = ({
  id,
  children,
  label,
  displayLabel,
  disabled,
  readonly,
  required,
  rawErrors = [],
  rawHelp,
  ...props
}: FieldTemplateProps) => {
  console.log("FIELD", props.rawDescription);
  return (
    <FormControl
      isDisabled={disabled}
      mb={2}
      id={id}
      isReadOnly={readonly}
      isRequired={required}
      isInvalid={!!rawErrors.length}
    >
      {displayLabel && <FormLabel htmlFor={id}>{label}</FormLabel>}
      {/* {props.description} */}
      {children}
      {rawErrors.length > 0 &&
        rawErrors.map((error, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <FormErrorMessage key={i} id={id}>
            {error}
          </FormErrorMessage>
        ))}
      {rawHelp && <FormHelperText id={id}>{rawHelp}</FormHelperText>}
    </FormControl>
  );
};
export default FieldTemplate;
