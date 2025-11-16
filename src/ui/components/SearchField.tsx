import React from 'react';
import { TextField, InputAdornment, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function SearchField(props: TextFieldProps) {
	return (
		<TextField
			fullWidth
			size="medium"
			placeholder="Search here"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				)
			}}
			{...props}
		/>
	);
}


