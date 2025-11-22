import React from 'react';
import { DataTable, Button, ProductListRow, ConfirmDialog } from '@ui/index';
import { useProducts } from '@hooks/useProducts';
import { createProduct, uploadProductImages, deleteProduct } from '@api/products';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Paper, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Alert, Chip, Stack, FormControlLabel, Switch, Drawer, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function Products() {
	const { data, isLoading, error } = useProducts();
	const queryClient = useQueryClient();
	const [rows, setRows] = React.useState<any[]>([]);
	const [toDelete, setToDelete] = React.useState<string | null>(null);
	const [isDeleting, setIsDeleting] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState<string | null>(null);
	const [open, setOpen] = React.useState(false);
	const [formError, setFormError] = React.useState<string | null>(null);
	const [isSaving, setIsSaving] = React.useState(false);
	const [form, setForm] = React.useState({
		name: '',
		category: '',
		description: '',
		price: 0,
		status: 'AVAILABLE',
		containsAllergens: false,
		allergensCsv: '',
		images: [] as { url: string; file?: File }[],
		mainIndex: 0
	});
	const [detailsOpen, setDetailsOpen] = React.useState(false);
	const [selected, setSelected] = React.useState<any | null>(null);

	React.useEffect(() => {
		if (data) setRows(data);
	}, [data]);

	const confirmDelete = async () => {
		if (!toDelete) return;
		
		setIsDeleting(true);
		setDeleteError(null);
		
		try {
			await deleteProduct(toDelete);
			// Invalidate and refetch products
			queryClient.invalidateQueries({ queryKey: ['products'] });
			setToDelete(null);
		} catch (err: any) {
			setDeleteError(err.message || 'Failed to delete product. Please try again.');
		} finally {
			setIsDeleting(false);
		}
	};

	const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []);
		if (!files.length) return;
		const remaining = 10 - form.images.length;
		const chosen = files.slice(0, remaining);
		const mapped = chosen.map((file) => ({ url: URL.createObjectURL(file), file }));
		setForm((f) => ({ ...f, images: [...f.images, ...mapped] }));
	};

	const removeImage = (idx: number) => {
		setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx), mainIndex: f.mainIndex === idx ? 0 : f.mainIndex > idx ? f.mainIndex - 1 : f.mainIndex }));
	};

	const saveProduct = async () => {
		setFormError(null);
		if (!form.name.trim()) return setFormError('Name is required');
		if (!form.category.trim()) return setFormError('Category is required');
		if (!(Number(form.price) > 0)) return setFormError('Price must be greater than 0');
		if (form.images.length === 0) return setFormError('At least one image is required');
		if (form.images.length > 10) return setFormError('Maximum of 10 images allowed');

		setIsSaving(true);
		try {
			const allergens = form.allergensCsv
				.split(',')
				.map((a) => a.trim())
				.filter(Boolean);

			// Create the product first
			const productData = {
				name: form.name.trim(),
				category: form.category.trim(),
				description: form.description.trim() || undefined,
				price: Number(form.price),
				status: form.status as 'AVAILABLE' | 'OUT_OF_STOCK' | 'INACTIVE',
				containsAllergens: form.containsAllergens,
				allergens: allergens.length > 0 ? allergens : undefined
			};

			const newProduct = await createProduct(productData);

			// Upload images if there are any
			const imageFiles = form.images.map((img) => img.file).filter((f): f is File => f !== undefined);
			if (imageFiles.length > 0) {
				console.log('uploading images', imageFiles);
				console.log('newProduct id', newProduct.id);
				await uploadProductImages(newProduct.id, imageFiles);
			}

			// Invalidate and refetch products
			queryClient.invalidateQueries({ queryKey: ['products'] });

			// Clean up object URLs
			form.images.forEach((img) => {
				if (img.url.startsWith('blob:')) {
					URL.revokeObjectURL(img.url);
				}
			});

			// Close dialog and reset form
			setOpen(false);
			setForm({ name: '', category: '', description: '', price: 0, status: 'AVAILABLE', containsAllergens: false, allergensCsv: '', images: [], mainIndex: 0 });
		} catch (err: any) {
			setFormError(err.message || 'Failed to create product. Please try again.');
		} finally {
			setIsSaving(false);
		}
	};

	const openDetails = (row: any) => {
		setSelected(row);
		setDetailsOpen(true);
	};

	return (
		<Box display="grid" gap={2}>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="h5" fontWeight={800}>Products</Typography>
				<Button onClick={() => setOpen(true)}>Add Product</Button>
			</Box>
			{isLoading && <Typography>Loading...</Typography>}
			{error && <Typography>Failed to load products.</Typography>}
			{!isLoading && !error && rows && rows.length > 0 && (
				<Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
					<DataTable
						columns={[
							{
								key: 'item',
								header: 'Items',
								render: (p: any) => (
									<ProductListRow imageUrl={p.images[0]} category={p.category} name={p.name} rating={p.rating} reviewsCount={p.reviewsCount} />
								)
							},
							{ key: 'quantity', header: 'Qty', render: (p: any) => <Typography fontWeight={700}>{(p.quantity ?? 1)}x</Typography>, align: 'left', width: 80 },
							{ key: 'price', header: 'Price', render: (p: any) => <Typography fontWeight={700}>${(p.price ?? 0).toFixed(2)}</Typography>, align: 'left', width: 120 },
							{ key: 'total', header: 'Total Price', render: (p: any) => <Typography fontWeight={700}>${(((p.quantity ?? 1) * (p.price ?? 0)).toFixed(2))}</Typography>, align: 'left', width: 140 },
							{ key: 'details', header: 'Details', align: 'left', width: 120, render: (p: any) => (
								<Button variant="outlined" onClick={() => openDetails(p)}>View</Button>
							)} ,
							{ key: 'deleted', header: 'Deleted', align: 'left', width: 100, render: (p: any) => (
								<IconButton color="error" onClick={() => setToDelete(p.id)}>
									<CloseIcon />
								</IconButton>
							)}
						]}
						rows={rows}
						getRowId={(r: any) => r.id}
					/>
				</Paper>
			)}
			{!isLoading && !error && rows && rows.length === 0 && (
				<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
					<Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
						<Typography color="text.secondary">No Products Found</Typography>
					</Box>
				</Paper>
			)}
			<ConfirmDialog
				open={Boolean(toDelete)}
				title="Delete item"
				message={
					<Box>
						<Typography>Are you sure you want to delete this product? This action cannot be undone.</Typography>
						{deleteError && (
							<Alert severity="error" sx={{ mt: 1 }}>
								{deleteError}
							</Alert>
						)}
					</Box>
				}
				onCancel={() => {
					setToDelete(null);
					setDeleteError(null);
				}}
				onConfirm={confirmDelete}
				confirmButtonDisabled={isDeleting}
				confirmButtonLoading={isDeleting}
			/>

			{/* Details Drawer */}
			<Drawer anchor="right" open={detailsOpen} onClose={() => setDetailsOpen(false)}>
				<Box sx={{ width: 360, p: 2 }}>
					<Typography variant="h6" fontWeight={800}>Product Details</Typography>
					<Divider sx={{ my: 1 }} />
					{selected && (
						<Box display="grid" gap={1}>
							<Typography fontWeight={700}>{selected.name}</Typography>
							<Typography variant="body2" color="text.secondary">{selected.category}</Typography>
							<Typography>${selected.price?.toFixed?.(2) ?? selected.price}</Typography>
							{selected.description && <Typography sx={{ mt: 1 }}>{selected.description}</Typography>}
							{selected.containsAllergens && (
								<Box sx={{ mt: 1 }}>
									<Typography variant="subtitle2" fontWeight={800}>Allergens</Typography>
									<Box display="flex" gap={1} flexWrap="wrap" mt={0.5}>
										{(selected.allergens ?? []).map((a: string, i: number) => (
											<Chip key={i} label={a} color="warning" size="small" />
										))}
									</Box>
								</Box>
							)}
							{selected.imageUrl && (
								<Box sx={{ mt: 1 }}>
									<img src={selected.imageUrl} alt="main" style={{ width: '100%', borderRadius: 8 }} />
								</Box>
							)}
						</Box>
					)}
				</Box>
			</Drawer>

			{/* Add Product Dialog */}
			<Dialog open={open} onClose={() => {
				// Clean up object URLs
				form.images.forEach((img) => {
					if (img.url.startsWith('blob:')) {
						URL.revokeObjectURL(img.url);
					}
				});
				setOpen(false);
				setForm({ name: '', category: '', description: '', price: 0, status: 'AVAILABLE', containsAllergens: false, allergensCsv: '', images: [], mainIndex: 0 });
				setFormError(null);
			}} fullWidth maxWidth="md">
				<DialogTitle>Add Product</DialogTitle>
				<DialogContent sx={{ display: 'grid', gap: 2, pt: 2 }}>
					{formError && <Alert severity="error">{formError}</Alert>}
					<TextField label="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
					<TextField label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} fullWidth />
					<TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth multiline minRows={3} />
					<TextField label="Price" type="number" inputProps={{ step: 0.01 }} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} fullWidth />
					<FormControl fullWidth>
						<InputLabel>Status</InputLabel>
						<Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as string })}>
							<MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
							<MenuItem value="OUT_OF_STOCK">OUT_OF_STOCK</MenuItem>
							<MenuItem value="INACTIVE">INACTIVE</MenuItem>
						</Select>
					</FormControl>
					<FormControlLabel control={<Switch checked={form.containsAllergens} onChange={(e) => setForm({ ...form, containsAllergens: e.target.checked })} />} label="Contains allergens" />
					<TextField label="Allergens (comma separated)" value={form.allergensCsv} onChange={(e) => setForm({ ...form, allergensCsv: e.target.value })} fullWidth />

					{/* Images uploader */}
					<Box>
						<Stack direction="row" alignItems="center" justifyContent="space-between">
							<Typography fontWeight={700}>Images (max 10)</Typography>
							<Button component="label" variant="outlined">Upload
								<input hidden type="file" accept="image/*" multiple onChange={onFilesSelected} />
							</Button>
						</Stack>
						<Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={1.5} mt={1}>
							{form.images.map((img, idx) => (
								<Box key={idx} sx={{ position: 'relative', border: '1px solid rgba(16,24,40,0.12)', borderRadius: 2, overflow: 'hidden' }}>
									<img src={img.url} alt="preview" style={{ width: '100%', height: 120, objectFit: 'cover' }} />
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 0.5 }}>
										<Button size="small" variant={form.mainIndex === idx ? 'contained' : 'outlined'} onClick={() => setForm((f) => ({ ...f, mainIndex: idx }))}>Main</Button>
										<Button size="small" color="error" onClick={() => removeImage(idx)}>Remove</Button>
									</Box>
								</Box>
							))}
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} disabled={isSaving}>Cancel</Button>
					<Button variant="contained" onClick={saveProduct} disabled={isSaving}>
						{isSaving && <CircularProgress size={16} sx={{ mr: 1 }} />}
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}


