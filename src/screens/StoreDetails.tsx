import React from 'react';
import { FormTextField, Button } from '@ui/index';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useStore, useUpdateStore } from '@hooks/useStore';

export function StoreDetails() {
	const { data: store, isLoading } = useStore();
	const updateStoreMutation = useUpdateStore();
	const [form, setForm] = React.useState({
		name: '',
		address: '',
		phone: '',
		email: '',
		description: '',
		logoUrl: ''
	});
	const [error, setError] = React.useState<string | null>(null);
	const [success, setSuccess] = React.useState(false);

	React.useEffect(() => {
		if (store) {
			setForm({
				name: store.name || '',
				address: store.address || '',
				phone: store.phone || '',
				email: store.email || '',
				description: store.description || '',
				logoUrl: store.logoUrl || ''
			});
		}
	}, [store]);

	const save = async () => {
		setError(null);
		setSuccess(false);
		try {
			await updateStoreMutation.mutateAsync(form);
			setSuccess(true);
		} catch (err: any) {
			setError(err.message || 'Failed to update store details');
		}
	};

	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box display="grid" gap={2} maxWidth={640}>
			<Typography variant="h5">Store Details</Typography>
			{error && <Alert severity="error">{error}</Alert>}
			{success && <Alert severity="success">Store details updated successfully</Alert>}
			<FormTextField label="Store Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Koki Restaurant" />
			<FormTextField label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="123 Main Street" />
			<FormTextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 555 5555" />
			<FormTextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="hello@koki.io" />
			<FormTextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Store description" multiline minRows={3} />
			<FormTextField label="Logo URL" value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} placeholder="https://example.com/logo.png" />
			<Box>
				<Button onClick={save} disabled={updateStoreMutation.isPending}>
					{updateStoreMutation.isPending ? 'Saving...' : 'Save Changes'}
				</Button>
			</Box>
		</Box>
	);
}


