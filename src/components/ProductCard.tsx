import { formatCurrency } from '@/lib/formatters';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

type TProductCardProps = {
	id: string;
	name: string;
	priceInCents: number;
	description: string;
	imagePath: string;
};

export default function ProductCard(props: TProductCardProps) {
	return (
		<Card className="flex overflow-hidden flex-col">
			<div className="relative w-full h-auto aspect-video">
				<Image src={props.imagePath} fill alt={props.name} />
			</div>
			<CardHeader>
				<CardTitle>{props.name}</CardTitle>
				<CardDescription>
					{formatCurrency(props.priceInCents / 100)}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className="line-clamp-4">{props.description}</p>
			</CardContent>
			<CardFooter>
				<Button asChild size="lg" className="w-full">
					<Link href={`/products/${props.id}/purchase`}>
						Purchase
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}

export function ProductCardSkeleton() {
	return (
		<Card className="flex overflow-hidden flex-col animate-pulse">
			<div className="w-full aspect-video bg-gray-300" />
			<CardHeader>
				<CardTitle>
					<div className="w-3/4 h-6 rounded-full bg-gray-300" />
				</CardTitle>
				<CardDescription>
					<div className="w-1/4 h-4 rounded-full bg-gray-300" />
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="w-full h-4 rounded-full bg-gray-300" />
				<div className="w-full h-4 rounded-full bg-gray-300" />
				<div className="w-3/4 h-4 rounded-full bg-gray-300" />
			</CardContent>
			<CardFooter>
				<Button size="lg" className="w-full" disabled />
			</CardFooter>
		</Card>
	);
}
