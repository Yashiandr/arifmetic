import type { TOperator } from '../../model/arithmetic-type/type';

type OperandProps = {
	operator: TOperator;
};

export function Operator({ operator }: OperandProps) {
	return <span className="h-full text-6xl flex items-center justify-center">{operator}</span>;
}
