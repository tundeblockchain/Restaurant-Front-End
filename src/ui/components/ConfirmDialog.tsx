import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, CircularProgress } from '@mui/material';

type Props = {
	open: boolean;
	title?: string;
	message: string | React.ReactNode;
	onCancel: () => void;
	onConfirm: () => void;
	confirmText?: string;
	cancelText?: string;
	confirmButtonDisabled?: boolean;
	confirmButtonLoading?: boolean;
};

export function ConfirmDialog({ 
	open, 
	title, 
	message, 
	onCancel, 
	onConfirm, 
	confirmText = 'Delete', 
	cancelText = 'Cancel',
	confirmButtonDisabled = false,
	confirmButtonLoading = false
}: Props) {
	return (
		<Dialog open={open} onClose={onCancel}>
			{title && (
				<Typography variant="h6" sx={{ px: 3, pt: 3 }}>
					{title}
				</Typography>
			)}
			<DialogContent>
				{typeof message === 'string' ? <Typography>{message}</Typography> : message}
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button variant="outlined" onClick={onCancel} disabled={confirmButtonLoading}>
					{cancelText}
				</Button>
				<Button color="error" variant="contained" onClick={onConfirm} disabled={confirmButtonDisabled || confirmButtonLoading}>
					{confirmButtonLoading && <CircularProgress size={16} sx={{ mr: 1 }} />}
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}


