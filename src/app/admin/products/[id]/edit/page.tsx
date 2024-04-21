import db from '@/db/db';
import PageHeader from '../../../_components/PageHeader';
import ProductForm from '../../_components/ProductForm';
import { notFound } from 'next/navigation';

type TEditProductPageProps = {
	params: {
		id: string;
	};
};

export default async function EditProductPage(props: TEditProductPageProps) {
	const product = await db.product.findUnique({
		where: { id: props.params.id },
	});

	if (!product) return notFound();

	return (
		<>
			<PageHeader>Edit Product</PageHeader>
			<ProductForm product={product} />
		</>
	);
}
