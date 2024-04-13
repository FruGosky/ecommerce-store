'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';

type TNavProps = {
	children: ReactNode;
};

export function Nav(props: TNavProps) {
	return (
		<nav className="bg-primary text-primary-foreground flex justify-center px-4">
			{props.children}
		</nav>
	);
}

type TNavLinkProps = Omit<ComponentProps<typeof Link>, 'className'>;

export function NavLink(props: TNavLinkProps) {
	const pathname = usePathname();
	return (
		<Link
			{...props}
			className={cn(
				'p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',
				pathname === props.href && 'bg-background text-foreground'
			)}
		></Link>
	);
}
