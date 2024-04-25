import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Tailwind,
} from '@react-email/components';
import OrderInformation from './components/OrderInformation';
import { Fragment } from 'react';

type TOrderHistoryProps = {
	orders: {
		id: string;
		pricePaidInCents: number;
		createdAt: Date;
		downloadVerificationId: string;
		product: {
			name: string;
			imagePath: string;
			description: string;
		};
	}[];
};

OrderHistory.PreviewProps = {
	orders: [
		{
			id: crypto.randomUUID(),
			createdAt: new Date(),
			pricePaidInCents: 10000,
			downloadVerificationId: crypto.randomUUID(),
			product: {
				name: 'Product name',
				description: 'Some description',
				imagePath:
					'/products/4618ae63-bc2d-4307-b7b9-ebf2fc46c661-RobloxScreenShot20240302_201244078.png',
			},
		},
		{
			id: crypto.randomUUID(),
			createdAt: new Date(),
			pricePaidInCents: 2000,
			downloadVerificationId: crypto.randomUUID(),
			product: {
				name: 'Product name 2',
				description: 'Some other description',
				imagePath:
					'/products/a827e34c-512a-436e-bb09-56a8b502547d-RobloxScreenShot20230306_200302733.png',
			},
		},
	],
} satisfies TOrderHistoryProps;

export default function OrderHistory(props: TOrderHistoryProps) {
	return (
		<Html>
			<Preview>Order History & Downloads</Preview>
			<Tailwind>
				<Head />
				<Body className="font-sans bg-white">
					<Container className="max-w-xl">
						<Heading>Order History</Heading>
						{props.orders.map((order, orderIndex) => (
							<Fragment key={order.id}>
								<OrderInformation
									order={order}
									product={order.product}
									downloadVerificationId={
										order.downloadVerificationId
									}
								/>
								{orderIndex < props.orders.length - 1 ? (
									<Hr />
								) : null}
							</Fragment>
						))}
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
