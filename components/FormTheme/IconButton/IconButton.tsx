import React from "react";
import { IconButton } from "@chakra-ui/react";
import {
  AddIcon,
  MinusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@chakra-ui/icons";

const mappings = {
  remove: <MinusIcon />,
  plus: <AddIcon />,
  "arrow-up": <ArrowUpIcon />,
  "arrow-down": <ArrowDownIcon />,
};

// type TIconButtonProps = IconButtonProps & {
//   iconMap: string | number | unknown
// }

const MyIconButton = (props: { [x: string]: any; iconMap: any }) => {
  const { iconMap, ...otherProps } = props;
  //@ts-ignore
  return (
    <IconButton
      {...otherProps}
      size="sm"
      icon={mappings[iconMap] ?? <AddIcon />}
    />
  );
};

export default MyIconButton;
