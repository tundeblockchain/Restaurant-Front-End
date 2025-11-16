import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export type ButtonProps = MuiButtonProps;

export function Button(props: ButtonProps) {
	return <MuiButton variant="contained" color="primary" {...props} />;
}


