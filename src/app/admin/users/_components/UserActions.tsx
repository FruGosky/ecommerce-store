'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteUser } from '../../_actions/users';

type TDeleteDropdownItemProps = {
	id: string;
};

export default function DeleteDropdownItem(props: TDeleteDropdownItemProps) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<DropdownMenuItem
			variant="destructive"
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await deleteUser(props.id);
					router.refresh();
				})
			}
		></DropdownMenuItem>
	);
}
