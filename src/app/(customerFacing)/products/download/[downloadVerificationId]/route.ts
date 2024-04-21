import db from '@/db/db';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';

type TGetProps = {
	params: {
		downloadVerificationId: string;
	};
};

export async function GET(request: NextRequest, props: TGetProps) {
	const data = await db.downloadVerification.findUnique({
		where: {
			id: props.params.downloadVerificationId,
			expiresAt: { gt: new Date() },
		},
		select: { product: { select: { filePath: true, name: true } } },
	});

	if (!data) {
		return NextResponse.redirect(
			new URL('/products/download/expired', request.url)
		);
	}

	const { size } = await fs.stat(data.product.filePath);
	const file = await fs.readFile(data.product.filePath);
	const extension = data.product.filePath.split('.').pop();

	return new NextResponse(file, {
		headers: {
			'Content-Disposition': `attachment; filename="${data.product.name}.${extension}"`,
			'Content-Length': size.toString(),
		},
	});
}
