import { CarouselOfOperations } from '@/features/CarouselOfOperations';
import { generateNumber } from '../model/services/generate-number';

export default async function ArithmeticPage() {
	const response = await generateNumber(1, 5, 3);
	return <CarouselOfOperations operations={response.operations} />;
}
