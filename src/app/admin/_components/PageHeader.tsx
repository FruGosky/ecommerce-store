import { ReactNode } from 'react';

type TPageHeaderProps = {
	children: ReactNode;
};

export default function PageHeader(props: TPageHeaderProps) {
	return (
		<h1 className="text-4xl mb-4">
			<></>
			{props.children}
		</h1>
	);
}
