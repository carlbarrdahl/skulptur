import React from "react";
import { Box, Heading, Divider, HeadingProps } from "@chakra-ui/react";
import { WidgetProps } from "@rjsf/core";

const TitleField: React.FC<WidgetProps & HeadingProps> = ({ title }) => (
  <Heading as="h3" size="lg" mb={2}>
    {title}
  </Heading>
);

export default TitleField;
