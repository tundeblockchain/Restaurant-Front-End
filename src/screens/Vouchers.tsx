import React from 'react';
import { Box, Paper, Typography, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Alert } from '@mui/material';
import { DataTable, SearchField } from '@ui/index';
import { useVouchers } from '@hooks/useVouchers';
import dayjs from 'dayjs';

export function Vouchers() {
	const { data, isLoading } = useVouchers();
	const [query, setQuery] = React.useState('');
	const [rows, setRows] = React.useState<any[]>([]);
	const [open, setOpen] = React.useState(false);
	const [formError, setFormError] = React.useState<string | null>(null);
	const [form, setForm] = React.useState({
		code: '',
		title: '',
		type: 'PERCENT',
		value: 10,
		startDate: dayjs().format('YYYY-MM-DD'),
		endDate: dayjs().add(30, 'day').format('YYYY-MM-DD'),
		active: true
	});

	React.useEffect(() => {
		if (data) setRows(data);
	}, [data]);

	const filtered = React.useMemo(() => {
		if (!rows) return [] as any[];
		const q = query.trim().toLowerCase();
		if (!q) return rows;
		return rows.filter((v: any) => [v.code, v.title].some((v2) => (v2 ?? '').toLowerCase().includes(q)));
	}, [rows, query]);

	const saveVoucher = () => {
		setFormError(null);
		if (!form.code.trim()) return setFormError('Code is required');
		if (!form.title.trim()) return setFormError('Title is required');
		if (!(Number(form.value) > 0)) return setFormError('Value must be greater than 0');
		if (dayjs(form.endDate).isBefore(dayjs(form.startDate))) return setFormError('End date must be after start date');
		const newVoucher = {
			id: `vch_${Math.random().toString(36).slice(2, 8)}`,
			code: form.code.trim().toUpperCase(),
			title: form.title.trim(),
			type: form.type,
			value: Number(form.value),
			startDate: dayjs(form.startDate).toISOString(),
			endDate: dayjs(form.endDate).toISOString(),
			active: form.active,
			usageCount: 0
		};
		setRows((prev) => [newVoucher, ...prev]);
		setOpen(false);
		setForm({ code: '', title: '', type: 'PERCENT', value: 10, startDate: dayjs().format('YYYY-MM-DD'), endDate: dayjs().add(30, 'day').format('YYYY-MM-DD'), active: true });
	};

	return (
		<Box display="grid" gap={2}>
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Typography variant="h5" fontWeight={800}>Vouchers</Typography>
				<Box display="flex" gap={2} alignItems="center">
					<Box width={360}>
						<SearchField placeholder="Search vouchers" value={query} onChange={(e) => setQuery((e.target as HTMLInputElement).value)} />
					</Box>
					<Button variant="contained" onClick={() => setOpen(true)}>Add Voucher</Button>
				</Box>
			</Box>
			<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
				{isLoading && <Typography>Loading...</Typography>}
				{!isLoading && (
					<DataTable
						columns={[
							{ key: 'code', header: 'Code' },
							{ key: 'title', header: 'Title' },
							{ key: 'type', header: 'Type', render: (v: any) => <Chip label={v.type} size="small" /> },
							{ key: 'value', header: 'Value', render: (v: any) => (v.type === 'PERCENT' ? `${v.value}%` : `$${v.value.toFixed(2)}`) },
							{ key: 'date', header: 'Date', render: (v: any) => `${dayjs(v.startDate).format('DD MMM YYYY')} - ${dayjs(v.endDate).format('DD MMM YYYY')}` },
							{ key: 'active', header: 'Active', render: (v: any) => <Chip label={v.active ? 'Active' : 'Inactive'} color={v.active ? 'success' : 'default'} size="small" /> },
							{ key: 'usageCount', header: 'Usage' }
						]}
						rows={filtered}
						getRowId={(r: any) => r.id}
					/>
				)}
			</Paper>

			{/* Add Voucher Dialog */}
			<Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
				<DialogTitle>Add Voucher</DialogTitle>
				<DialogContent sx={{ display: 'grid', gap: 2, pt: 2 }}>
					{formError && <Alert severity="error">{formError}</Alert>}
					<TextField label="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} fullWidth />
					<TextField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth />
					<FormControl fullWidth>
						<InputLabel>Type</InputLabel>
						<Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as string })}>
							<MenuItem value="PERCENT">PERCENT</MenuItem>
							<MenuItem value="AMOUNT">AMOUNT</MenuItem>
						</Select>
					</FormControl>
					<TextField label="Value" type="number" inputProps={{ step: 0.01 }} value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} fullWidth />
					<Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
						<TextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
						<TextField label="End Date" type="date" InputLabelProps={{ shrink: true }} value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
					</Box>
					<FormControlLabel control={<Switch checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />} label="Active" />
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button variant="contained" onClick={saveVoucher}>Save</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}


