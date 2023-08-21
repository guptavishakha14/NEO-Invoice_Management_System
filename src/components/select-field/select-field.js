import { Fragment } from "react";
import './select-field.css'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

const SelectField = ({
  label,
  value,
  options,
  onChange,
  displayValue = (selected) => selected.join(", "),
}) => {
  return (
    <Fragment>
      <FormControl sx={{ m: 0, minWidth: 120 }}>
        <InputLabel style={{ color: 'white' }}>{label}</InputLabel>
        <Select
          multiple
          value={value || []}
          onChange={onChange}
          renderValue={displayValue}
          style={{ width: "220px", display: "inline-table", border: "none", outline: "none"}}
        >
          {/* <MenuItem value="" disabled>
            {label}
          </MenuItem> */}
          {options &&
            options.map((option) => (
              <MenuItem key={option} value={option} >
                <Checkbox checked={(value || []).indexOf(option) > -1} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Fragment>
  );
};

export default SelectField;
