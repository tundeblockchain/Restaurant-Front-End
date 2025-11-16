import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableRowProps, TableSortLabel } from '@mui/material';

export type Column<T> = {
	key: keyof T | string;
	header: string;
	render?: (row: T) => React.ReactNode;
	align?: 'right' | 'left' | 'center';
	width?: number | string;
	sortable?: boolean;
};

type Props<T> = {
	columns: Column<T>[];
	rows: T[];
	getRowId?: (row: T, index: number) => string | number;
	rowProps?: (row: T) => TableRowProps;
	sortKey?: string;
	sortDirection?: 'asc' | 'desc';
	onSortChange?: (key: string) => void;
};

export function DataTable<T>({ columns, rows, getRowId, rowProps, sortKey, sortDirection = 'asc', onSortChange }: Props<T>) {
	return (
		<TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
			<Table
				size="small"
				sx={{
					'& tbody tr td': { borderBottom: '1px solid rgba(16,24,40,0.06)' },
					'& tbody tr:last-of-type td': { borderBottom: 0 },
					'& .MuiTableCell-root': { fontSize: '0.98rem', py: 1.5 },
					'& thead .MuiTableCell-root': { fontWeight: 700, fontSize: '1rem', py: 1.5 }
				}}
			>
				<TableHead>
					<TableRow>
						{columns.map((c) => (
							<TableCell key={String(c.key)} align={c.align} sx={{ width: c.width }}>
								{c.sortable ? (
									<TableSortLabel
										active={sortKey === c.key}
										direction={sortKey === c.key ? sortDirection : 'asc'}
										onClick={() => onSortChange?.(String(c.key))}
									>
										{c.header}
									</TableSortLabel>
								) : (
									c.header
								)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, i) => (
						<TableRow key={String(getRowId?.(row, i) ?? i)} {...rowProps?.(row)}>
							{columns.map((c) => (
								<TableCell key={String(c.key)} align={c.align}>
									{c.render ? c.render(row) : String((row as any)[c.key])}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}


