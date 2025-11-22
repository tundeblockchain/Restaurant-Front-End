import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	Avatar,
	Badge,
	Menu,
	MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonIcon from '@mui/icons-material/Person';
import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@contexts/AuthContext';
import dayjs from 'dayjs';

const drawerWidth = 260;

const links = [
	{ to: '/', label: 'Dashboard', icon: <DashboardIcon /> },
	{ to: '/store', label: 'Store Details', icon: <StoreIcon /> },
	{ to: '/products', label: 'Products', icon: <Inventory2Icon /> },
	{ to: '/orders', label: 'Orders', icon: <ReceiptLongIcon /> },
	{ to: '/customers', label: 'Customers', icon: <PeopleIcon /> },
	{ to: '/users', label: 'Users', icon: <PeopleIcon /> },
	{ to: '/analytics', label: 'Analytics', icon: <InsightsIcon /> },
	{ to: '/reviews', label: 'Reviews', icon: <ReviewsIcon /> },
	{ to: '/vouchers', label: 'Vouchers', icon: <LocalOfferIcon /> }
];

export function AppLayout() {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		await logout();
		navigate('/login');
	};

	const greeting = React.useMemo(() => {
		const hour = dayjs().hour();
		if (hour < 12) return 'Good Morning';
		if (hour < 18) return 'Good Afternoon';
		return 'Good Evening';
	}, []);

	const drawer = (
		<Box sx={{ px: 1, height: '100%', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
			<Box sx={{ p: 2 }}>
				<Typography variant="h6" fontWeight={800}>
					Koki
				</Typography>
			</Box>
			<List>
				{links.map((item) => {
					const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
					return (
						<ListItemButton
							key={item.to}
							component={NavLink}
							to={item.to}
							selected={isActive}
							sx={{
								borderRadius: 2,
								my: 0.5,
								color: 'inherit',
								'&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.16)' },
								'&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
							}}
						>
							<ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
							<ListItemText primary={<Typography fontWeight={700} fontSize={15}>{item.label}</Typography>} />
						</ListItemButton>
					);
				})}
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar position="fixed" elevation={0} sx={{ zIndex: (t) => t.zIndex.drawer + 1, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
				<Toolbar>
					<IconButton color="inherit" edge="start" onClick={() => setMobileOpen((v) => !v)} sx={{ mr: 2, display: { md: 'none' } }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
						Restaurant Admin
					</Typography>
					<Box display="flex" alignItems="center" gap={1}>
						<Badge badgeContent={12} color="error">
							<IconButton color="inherit">
								<NotificationsIcon />
							</IconButton>
						</Badge>
						<Badge badgeContent={5} color="error">
							<IconButton color="inherit">
								<ChatBubbleOutlineIcon />
							</IconButton>
						</Badge>
						<Badge badgeContent={2} color="error">
							<IconButton color="inherit">
								<CardGiftcardIcon />
							</IconButton>
						</Badge>
						<Box display="flex" alignItems="center" gap={1} sx={{ ml: 2, cursor: 'pointer' }} onClick={handleClick}>
							<Box textAlign="right">
								<Typography variant="body2" color="text.secondary">{greeting}</Typography>
								<Typography fontWeight={700}>{user?.name || 'User'}</Typography>
							</Box>
							<Avatar src={user?.avatarUrl ?? undefined} sx={{ width: 40, height: 40 }} />
						</Box>
						<Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ elevation: 2, sx: { borderRadius: 2, mt: 1 } }}>
							<MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
								<ListItemIcon>
									<PersonIcon fontSize="small" />
								</ListItemIcon>
								<Typography>Profile</Typography>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<InboxIcon fontSize="small" />
								</ListItemIcon>
								<Typography>Inbox</Typography>
							</MenuItem>
							<MenuItem onClick={handleLogout}>
								<ListItemIcon>
									<LogoutIcon fontSize="small" />
								</ListItemIcon>
								<Typography>Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
			<Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="sidebar">
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={() => setMobileOpen(false)}
					ModalProps={{ keepMounted: true }}
					sx={{
						display: { xs: 'block', md: 'none' },
						'& .MuiDrawer-paper': { width: drawerWidth, backgroundColor: 'transparent' }
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', md: 'block' },
						'& .MuiDrawer-paper': { width: drawerWidth, borderRight: 0, backgroundColor: 'transparent' }
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, bgcolor: 'background.default', minHeight: '100vh' }}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
}

