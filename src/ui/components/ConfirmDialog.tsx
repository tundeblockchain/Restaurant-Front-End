import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';

type Props = {
	open: boolean;
	title?: string;
	message: string;
	onCancel: () => void;
	onConfirm: () => void;
	confirmText?: string;
	cancelText?: string;
};

export function ConfirmDialog({ open, title, message, onCancel, onConfirm, confirmText = 'Delete', cancelText = 'Cancel' }: Props) {
	return (
		<Dialog open={open} onClose={onCancel}>
			{title && (
				<Typography variant="h6" sx={{ px: 3, pt: 3 }}>
					{title}
				</Typography>
			)}
			<DialogContent>
				<Typography>{message}</Typography>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button variant="outlined" onClick={onCancel}>
					{cancelText}
				</Button>
				<Button color="error" variant="contained" onClick={onConfirm}>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}


