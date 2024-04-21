import { Nav, NavLink } from '@/components/Nav';
import { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

type TCustomerLayoutProps = {
	children: ReactNode;
};

export default function CustomerLayout(props: TCustomerLayoutProps) {
	return (
		<>
			<Nav>
				<NavLink href="/">Home</NavLink>
				<NavLink href="/products">Products</NavLink>
				<NavLink href="/orders">My Orders</NavLink>
			</Nav>
			<div className="container my-6">{props.children}</div>
		</>
	);
}
