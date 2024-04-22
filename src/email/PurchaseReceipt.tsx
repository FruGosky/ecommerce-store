import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Tailwind,
} from '@react-email/components';
import OrderInformation from './components/OrderInformation';

type TPurchaseReceiptProps = {
	product: {
		name: string;
		imagePath: string;
		description: string;
	};
	order: { id: string; createdAt: Date; pricePaidInCents: number };
	downloadVerificationId: string;
};

PurchaseReceipt.PreviewProps = {
	product: {
		name: 'Product name',
		description: 'Some description',
		imagePath:
			'/products/4618ae63-bc2d-4307-b7b9-ebf2fc46c661-RobloxScreenShot20240302_201244078.png',
	},
	order: {
		id: crypto.randomUUID(),
		createdAt: new Date(),
		pricePaidInCents: 10000,
	},
	downloadVerificationId: crypto.randomUUID(),
} satisfies TPurchaseReceiptProps;

export default function PurchaseReceipt(props: TPurchaseReceiptProps) {
	return (
		<Html>
			<Preview>Download {props.product.name} and view receipt</Preview>
			<Tailwind>
				<Head />
				<Body className="font-sans bg-white">
					<Container className="max-w-xl">
						<Heading>Purchase Receipt</Heading>
						<OrderInformation
							order={props.order}
							product={props.product}
							downloadVerificationId={
								props.downloadVerificationId
							}
						/>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
