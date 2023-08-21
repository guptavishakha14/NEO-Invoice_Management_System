import React from 'react'
import TextField from '@mui/material/TextField';
import './input-field.css'

export default function InputField(props) {
  return (
    <div>
      <TextField
            label={props.label}
            // id="filled-size-normal"
            defaultValue={props.defaultValue}
            variant="filled"
            className='input-bg'
        />
    </div>
  )
}
