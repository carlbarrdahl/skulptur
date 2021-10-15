import React from "react";
import { Text } from "@chakra-ui/react";
import { FieldTemplateProps } from "@rjsf/core";

const DescriptionField = ({ description }: FieldTemplateProps) => {
  if (description) {
    return (
      <Text fontSize="lg" mb={4} sx={{ whiteSpace: "pre-wrap" }}>
        {description}
      </Text>
    );
  }

  return null;
};

export default DescriptionField;
