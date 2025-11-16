import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export function FormTextField(props: TextFieldProps) {
	return <TextField fullWidth size="small" {...props} />;
}


