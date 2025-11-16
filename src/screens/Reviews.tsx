import React from 'react';
import { Box, Paper, Typography, Button, Chip, Avatar, IconButton, Tooltip, Divider } from '@mui/material';
import { SearchField, RatingStars } from '@ui/index';
import { useReviews } from '@hooks/useReviews';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export function Reviews() {
	const { data } = useReviews();
	const [query, setQuery] = React.useState('');
	const [rows, setRows] = React.useState<any[]>([]);

	React.useEffect(() => {
		if (data) setRows(data);
	}, [data]);

	const filtered = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return rows;
		return rows.filter((r: any) => [r.customerName, r.comment, r.orderRef].some((v) => (v ?? '').toLowerCase().includes(q)));
	}, [rows, query]);

	const approve = (id: string) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'PUBLISHED' } : r)));
	const reject = (id: string) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'REJECTED' } : r)));

	return (
		<Box display="grid" gap={2}>
			{/* Header actions */}
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Box display="flex" gap={2}>
					<Button variant="contained" color="success">Publish</Button>
					<Button variant="contained" color="error">Delete</Button>
				</Box>
				<Box display="flex" gap={2} alignItems="center">
					<Box width={360}>
						<SearchField placeholder="Search here" value={query} onChange={(e) => setQuery((e.target as HTMLInputElement).value)} />
					</Box>
					<Chip label="Filter" variant="outlined" />
				</Box>
			</Box>

			{/* Reviews list */}
			<Paper elevation={0} sx={{ p: 0, borderRadius: 3 }}>
				{filtered.map((r: any, idx: number) => (
					<Box key={r.id}>
						<Box display="grid" gridTemplateColumns="auto 1fr auto" alignItems="center" gap={2} sx={{ p: 2.5 }}>
							{/* Left avatar + name */}
							<Box display="flex" alignItems="center" gap={2}>
								<Avatar src={r.customerAvatarUrl} sx={{ width: 72, height: 72 }} />
								<Box>
									<Typography variant="caption" color="primary" fontWeight={800}>{r.orderRef}</Typography>
									<Typography fontWeight={800} fontSize={20}>{r.customerName}</Typography>
									<Typography variant="body2" color="text.secondary">{new Date(r.createdAt).toLocaleString()}</Typography>
								</Box>
							</Box>
							{/* Middle comment */}
							<Typography color="text.primary">{r.comment}</Typography>
							{/* Right rating + actions */}
							<Box display="grid" gap={1} justifyItems="end">
								<Typography variant="h5" fontWeight={800}>{r.rating.toFixed(1)}</Typography>
								<RatingStars value={r.rating} />
								<Box>
									<Tooltip title="Approve">
										<IconButton color="success" onClick={() => approve(r.id)}>
											<CheckCircleOutlineIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Reject">
										<IconButton color="error" onClick={() => reject(r.id)}>
											<HighlightOffIcon />
										</IconButton>
									</Tooltip>
								</Box>
							</Box>
						</Box>
						{idx < filtered.length - 1 && <Divider />}
					</Box>
				))}
			</Paper>
		</Box>
	);
}


