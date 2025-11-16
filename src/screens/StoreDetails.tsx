import React from 'react';
import { FormTextField, Button } from '@ui/index';
import { Box, Typography } from '@mui/material';

export function StoreDetails() {
	return (
		<Box display="grid" gap={2} maxWidth={640}>
			<Typography variant="h5">Store Details</Typography>
			<FormTextField label="Store Name" placeholder="Koki Restaurant" />
			<FormTextField label="Address" placeholder="123 Main Street" />
			<FormTextField label="Phone" placeholder="+1 555 555 5555" />
			<FormTextField label="Email" placeholder="hello@koki.io" />
			<Box>
				<Button>Save Changes</Button>
			</Box>
		</Box>
	);
}


