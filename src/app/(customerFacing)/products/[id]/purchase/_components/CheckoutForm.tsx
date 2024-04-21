'use client';

import { isUserOrderExists } from '@/app/_actions/orders';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters';
import {
	Elements,
	LinkAuthenticationElement,
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

type TCheckoutFormProps = {
	product: {
		id: string;
		name: string;
		priceInCents: number;
		description: string;
		imagePath: string;
	};
	clientSecret: string;
};

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function CheckoutForm(props: TCheckoutFormProps) {
	return (
		<div className="max-w-5xl w-full mx-auto space-y-8">
			<div className="flex gap-4 items-center">
				<div className="aspect-video flex-shrink-0 w-1/3 relative">
					<Image
						src={props.product.imagePath}
						alt={props.product.name}
						fill
						className="object-cover"
					/>
				</div>
				<div>
					<div className="text-lg">
						{formatCurrency(props.product.priceInCents / 100)}
					</div>
					<h1 className="text-2xl font-bold">{props.product.name}</h1>
					<div className="line-clamp-3 text-muted-foreground">
						{props.product.description}
					</div>
				</div>
			</div>
			<Elements
				options={{ clientSecret: props.clientSecret }}
				stripe={stripePromise}
			>
				<Form
					priceInCents={props.product.priceInCents}
					productId={props.product.id}
				/>
			</Elements>
		</div>
	);
}

type TFormProps = {
	productId: string;
	priceInCents: number;
};

function Form(props: TFormProps) {
	const stripe = useStripe();
	const elements = useElements();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>();
	const [email, setEmail] = useState<string>();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (!stripe || !elements || !email) return;

		setIsLoading(true);

		const isOrderExist = await isUserOrderExists(email, props.productId);

		if (isOrderExist) {
			setErrorMessage(
				'You have already purchased this product. Try downloading it from the My Orders page'
			);
			setIsLoading(false);
			return;
		}

		stripe
			.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
				},
			})
			.then(({ error }) => {
				if (
					error.type === 'card_error' ||
					error.type === 'validation_error'
				) {
					setErrorMessage(error.message);
					return;
				}
				setErrorMessage('An unknown error occurred');
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Checkout</CardTitle>
					{errorMessage ? (
						<CardDescription className="text-destructive">
							{errorMessage}
						</CardDescription>
					) : null}
				</CardHeader>
				<CardContent>
					<PaymentElement />
					<div className="mt-4">
						<LinkAuthenticationElement
							onChange={(event) => setEmail(event.value.email)}
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						className="w-full"
						size="lg"
						disabled={!stripe || !elements || isLoading}
					>
						{isLoading
							? 'Purchasing...'
							: `Purchase - ${formatCurrency(
									props.priceInCents / 100
							  )}`}
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
