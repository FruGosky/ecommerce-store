import { Nav, NavLink } from '@/components/Nav';
import { ReactNode } from 'react';

type TAdminLayoutProps = {
	children: ReactNode;
};

export default function AdminLayout(props: TAdminLayoutProps) {
	return (
		<>
			<Nav>
				<NavLink href="/admin">Dashboard</NavLink>
				<NavLink href="/admin/products">Products</NavLink>
				<NavLink href="/admin/users">Customers</NavLink>
				<NavLink href="/admin/orders">Sales</NavLink>
			</Nav>
			<div className="container my-6">{props.children}</div>
		</>
	);
}
