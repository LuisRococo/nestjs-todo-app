import { Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import React, { FC } from "react";
import { ControllerFieldState, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface Props {
  placeholder: string;
  label: string;
  Icon: IconType;
  fieldData?: any;
  fieldState?: ControllerFieldState;
  type?: string;
}

const FormInput: FC<Props> = ({
  label,
  placeholder,
  Icon,
  fieldData,
  type,
  fieldState,
}) => {
  return (
    <div>
      <p className="tw-text-slate-500">{label}</p>
      <TextField
        sx={{ width: "100%" }}
        placeholder={placeholder}
        type={type}
        error={fieldState?.error}
        helperText={fieldState?.error?.message}
        autoComplete="on"
        {...fieldData}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon style={{ fontSize: "30px" }} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default FormInput;
