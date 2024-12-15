'use client';

import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui';
import { useCallback, useState, type ChangeEventHandler, type Ref } from 'react';
import Confetti from 'react-confetti';

export function InputNumber({ size, result, ref }: { size: number; result: number; ref?: Ref<HTMLInputElement> }) {
	const [value, setValue] = useState<number | string | undefined>('');
	const isWin = value === result;

	const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
		(e) => {
			if (e.target.value.length > size || Number.isNaN(Number(e.target.value))) return;
			setValue(Number(e.target.value));
		},
		[size],
	);

	return (
		<>
			<Input
				onChange={handleChange}
				value={value}
				maxLength={size}
				ref={ref}
				type="text"
				disabled={isWin}
				style={{ maxWidth: size * 36 + 10 }}
				className={cn(
					`text-right font-bold !focus:outline-none !border-none outline-none !focus:border-none h-fit shadow-none p-0 !text-6xl`,
					{ 'text-green-600': isWin },
				)}
			/>
			{isWin && <Confetti width={1000} height={1000} className="left-0" recycle={false} numberOfPieces={500} />}
		</>
	);
}
