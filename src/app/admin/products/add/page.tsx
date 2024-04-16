import PageHeader from '../../_components/PageHeader';
import ProductForm from '../_components/ProductForm';

type TAddProductPageProps = {};

export default function AddProductPage(props: TAddProductPageProps) {
	return (
		<>
			<PageHeader>Add Product</PageHeader>
			<ProductForm />
		</>
	);
}
