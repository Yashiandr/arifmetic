import { Button } from '@/shared/ui';
import Link from 'next/link';

export default function RootPage() {
	return (
		<main className="flex items-center justify-center w-screen h-screen">
			<Button variant={'link'} size={'lg'}>
				<Link href={'/arithmetic'}>Начать</Link>
			</Button>
		</main>
	);
}
