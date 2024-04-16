'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTransition } from 'react';
import {
	deleteProduct,
	toggleProductAvailability,
} from '../../_actions/products';
import { useRouter } from 'next/navigation';

type TActiveToggleDropdownItemProps = {
	id: string;
	isAvailableForPurchase: boolean;
};

export function ActiveToggleDropdownItem(
	props: TActiveToggleDropdownItemProps
) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<DropdownMenuItem
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await toggleProductAvailability(
						props.id,
						!props.isAvailableForPurchase
					);
					router.refresh();
				});
			}}
		>
			{props.isAvailableForPurchase ? 'Deactivate' : 'Activate'}
		</DropdownMenuItem>
	);
}

type TDeleteDropdownItemProps = {
	id: string;
	disabled: boolean;
};

export function DeleteDropdownItem(props: TDeleteDropdownItemProps) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<DropdownMenuItem
			variant="destructive"
			disabled={props.disabled || isPending}
			onClick={() => {
				startTransition(async () => {
					await deleteProduct(props.id);
					router.refresh();
				});
			}}
		>
			Delete
		</DropdownMenuItem>
	);
}
