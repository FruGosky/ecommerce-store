import { formatCurrency } from '@/lib/formatters';
import {
	Button,
	Column,
	Img,
	Row,
	Section,
	Text,
} from '@react-email/components';

type TOrderInformationProps = {
	order: { id: string; createdAt: Date; pricePaidInCents: number };
	product: { imagePath: string; name: string; description: string };
	downloadVerificationId: string;
};

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

export default function OrderInformation(props: TOrderInformationProps) {
	return (
		<>
			<Section>
				<Row>
					<Column>
						<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
							Order ID
						</Text>
						<Text className="mt-0 mr-4">{props.order.id}</Text>
					</Column>
					<Column>
						<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
							Purchased On
						</Text>
						<Text className="mt-0 mr-4">
							{dateFormatter.format(props.order.createdAt)}
						</Text>
					</Column>
					<Column>
						<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
							Price Paid
						</Text>
						<Text className="mt-0 mr-4">
							{formatCurrency(props.order.pricePaidInCents / 100)}
						</Text>
					</Column>
				</Row>
			</Section>
			<Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
				<Img
					width="100%"
					alt={props.product.name}
					src={`${process.env.NEXT_PUBLIC_SERVER_URL}${props.product.imagePath}`}
				/>
				<Row className="mt-8">
					<Column>
						<Text className="text-lg font-bold m-0 mr-4">
							{props.product.name}
						</Text>
						<Text className="text-gray-500 mb-0">
							{props.product.description}
						</Text>
					</Column>
					<Column align="right">
						<Button
							href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${props.downloadVerificationId}`}
							className="bg-black text-white px-6 py-4 rounded text-lg"
						>
							Download
						</Button>
					</Column>
				</Row>
			</Section>
		</>
	);
}
