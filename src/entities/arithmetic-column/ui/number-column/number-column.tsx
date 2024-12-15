import type { TOperations } from '../../model/arithmetic-type/type';
import { InputNumber } from '../input-number/input-number';
import { NumberComponent } from '../number/number-component';
import { Operator } from '../operator/operator';

type NumberColumnProps = {
	operations: TOperations;
};

export function NumberColumn({ operations }: NumberColumnProps) {
	const { operands, operators, result } = operations;
	return (
		<section className="relative flex flex-col  w-full items-center self-center">
			<div className="flex items-end border-b-2 border-black">
				<div className="flex flex-col h-full pb-7 pt-6 pr-2 justify-center items-center">
					{operators.map((operator, index) => (
						<Operator operator={operator} key={index} />
					))}
				</div>
				<div className="flex flex-col items-end">
					<div className="flex flex-col items-end">
						{operands.map((operand, index) => (
							<NumberComponent num={operand} key={index} />
						))}
					</div>
				</div>
			</div>
			<InputNumber result={result} size={result.toString().length + 1} />
			<b className="text-6xl self-end text-black/5">{result}</b>
		</section>
	);
}
