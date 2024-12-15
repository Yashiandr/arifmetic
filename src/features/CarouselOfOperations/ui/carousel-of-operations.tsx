'use client';
import { NumberColumn, type TOperations } from '@/entities/arithmetic-column';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui';
import React from 'react';

type CarouselOfOperationsProps = {
	operations: TOperations[];
};

export function CarouselOfOperations({ operations }: CarouselOfOperationsProps) {
	return (
		<div className="rounded-md bg-slate-300 w-96">
			<Carousel>
				<CarouselContent>
					{operations.map((operationExp, index) => (
						<CarouselItem key={index} className="flex items-center justify-center">
							<NumberColumn operations={operationExp} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
