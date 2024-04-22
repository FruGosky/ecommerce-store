'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteOrder } from '../../_actions/orders';

type TDeleteDropdownItemProps = {
	id: string;
};

export function DeleteDropdownItem(props: TDeleteDropdownItemProps) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<DropdownMenuItem
			variant="destructive"
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await deleteOrder(props.id);
					router.refresh();
				})
			}
		>
			Delete
		</DropdownMenuItem>
	);
}
