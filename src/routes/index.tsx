import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../ui/layout/AppLayout';
import { Dashboard } from '../screens/Dashboard';
import { StoreDetails } from '../screens/StoreDetails';
import { Products } from '../screens/Products';
import { Orders } from '../screens/Orders';
import { Customers } from '../screens/Customers';
import { Analytics } from '../screens/Analytics';
import { Reviews } from '../screens/Reviews';
import { Vouchers } from '../screens/Vouchers';
import { OrderDetail } from '../screens/OrderDetail';
import { Users } from '../screens/Users';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Profile } from '../screens/Profile';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/register',
		element: <Register />
	},
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<AppLayout />
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <Dashboard /> },
			{ path: 'store', element: <StoreDetails /> },
			{ path: 'products', element: <Products /> },
			{ path: 'orders', element: <Orders /> },
			{ path: 'orders/:orderId', element: <OrderDetail /> },
			{ path: 'customers', element: <Customers /> },
			{ path: 'users', element: <Users /> },
			{ path: 'analytics', element: <Analytics /> },
			{ path: 'reviews', element: <Reviews /> },
			{ path: 'vouchers', element: <Vouchers /> },
			{ path: 'profile', element: <Profile /> }
		]
	}
]);

