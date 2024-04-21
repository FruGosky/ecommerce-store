import fs from 'fs/promises';
import db from '@/db/db';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

type TGetProps = {
	params: {
		id: string;
	};
};

export async function GET(req: NextRequest, props: TGetProps) {
	const product = await db.product.findUnique({
		where: { id: props.params.id },
		select: { filePath: true, name: true },
	});

	if (!product) return notFound();

	const { size } = await fs.stat(product.filePath);
	const file = await fs.readFile(product.filePath);
	const extension = product.filePath.split('.').pop();

	return new NextResponse(file, {
		headers: {
			'Content-Disposition': `attachment; filename="${product.name}.${extension}"`,
			'Content-Length': size.toString(),
		},
	});
}
