'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/formatters';
import { useState } from 'react';
import { addProduct, updateProduct } from '../../_actions/products';
import { useFormState, useFormStatus } from 'react-dom';
import { Product } from '@prisma/client';
import Image from 'next/image';

type TProductFormProps = {
	product?: Product;
};

export default function ProductForm(props: TProductFormProps) {
	const [error, action] = useFormState(
		!props.product
			? addProduct
			: updateProduct.bind(null, props.product.id),
		{}
	);
	const [priceInCents, setPriceInCents] = useState<number | undefined>(
		props.product?.priceInCents
	);

	return (
		<form action={action} className="space-y-8">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input
					type="text"
					id="name"
					name="name"
					required
					defaultValue={props.product?.name || ''}
				/>
				{error.name ? (
					<div className="text-destructive">{error.name}</div>
				) : null}
			</div>
			<div className="space-y-2">
				<Label htmlFor="priceInCents">Price In Cents</Label>
				<Input
					type="number"
					id="priceInCents"
					name="priceInCents"
					required
					value={priceInCents}
					onChange={(e) => setPriceInCents(Number(e.target.value))}
				/>
				<div className="test-muted-foreground">
					{formatCurrency((priceInCents || 0) / 100)}
				</div>
				{error.priceInCents ? (
					<div className="text-destructive">{error.priceInCents}</div>
				) : null}
			</div>
			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Textarea
					id="description"
					name="description"
					required
					defaultValue={props.product?.description || ''}
				/>
				{error.description ? (
					<div className="text-destructive">{error.description}</div>
				) : null}
			</div>
			<div className="space-y-2">
				<Label htmlFor="file">File</Label>
				<Input
					type="file"
					id="file"
					name="file"
					required={props.product == null}
				/>
				{props.product != null ? (
					<div className="text-muted-foreground">
						{props.product.filePath}
					</div>
				) : null}
				{error.file ? (
					<div className="text-destructive">{error.file}</div>
				) : null}
			</div>
			<div className="space-y-2">
				<Label htmlFor="image">Image</Label>
				<Input
					type="file"
					id="image"
					name="image"
					required={props.product == null}
				/>
				{props.product != null ? (
					<Image
						src={props.product.imagePath}
						alt="Product image"
						height="400"
						width="400"
					/>
				) : null}
				{error.image ? (
					<div className="text-destructive">{error.image}</div>
				) : null}
			</div>
			<SubmitButton />
		</form>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending}>
			{pending ? 'Saving...' : 'Save'}
		</Button>
	);
}
