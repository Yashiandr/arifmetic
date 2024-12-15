type NumberProps = {
	num: number | string;
};

export function NumberComponent({ num }: NumberProps) {
	return (
		<section className="text-6xl">
			{num
				.toString()
				.split('')
				.map((char, index) => (
					<b key={index}>{char}</b>
				))}
		</section>
	);
}
