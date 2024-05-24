import { Input, InputLabel } from "@mui/material";
import React, { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface Props {
  placeholder: string;
  label: string;
  Icon: IconType;
}

const FormInput: FC<Props> = ({ label, placeholder, Icon }) => {
  return (
    <div>
      <div className="tw-flex tw-gap-x-2">
        <Icon style={{ fontSize: "30px" }} />
        <Input sx={{ flex: 1 }} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default FormInput;
