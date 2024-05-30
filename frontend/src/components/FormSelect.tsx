import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import React, { FC } from "react";
import { ControllerFieldState } from "react-hook-form";

export interface FormSelectItem {
  id: any;
  title: string;
}

interface Props {
  label: string;
  values: FormSelectItem[];
  fieldData?: any;
  fieldState?: ControllerFieldState;
}

const FormSelect: FC<Props> = ({ label, fieldData, fieldState, values }) => {
  return (
    <FormControl fullWidth error={!!fieldState?.error}>
      <p className="tw-text-slate-500">{label}</p>
      <Select {...fieldData}>
        <MenuItem value="none">Select an option</MenuItem>
        {values.map((value) => (
          <MenuItem key={value.id} value={value.id}>
            {value.title}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState?.error?.message}</FormHelperText>
    </FormControl>
  );
};

export default FormSelect;
