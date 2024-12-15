'use server';

import type { TOperations } from '@/entities/arithmetic-column';
import type { ArithmeticOperation } from '../arithmetic-page-types/type';
import type { TOperator } from '@/entities/arithmetic-column/model/arithmetic-type/type';

function calculate(val1: number, val2: number, operand: '+' | '-') {
	switch (operand) {
		case '+':
			return val1 + val2;
		case '-':
			return val1 - val2;
	}
}

function getRandomArbitrary(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

function getRandom(base = 1) {
	return Number.parseInt((Math.random() * 10 ** base + 1).toFixed(0));
}

function generateOperand(): TOperator {
	const random = Math.random();
	switch (true) {
		case random > 0.5:
			return '+';
		default:
			return '-';
	}
}

function generateOperation(base: number, level: number): TOperations {
	const operation: TOperations = {
		operators: [],
		operands: [],
		result: 0,
	};
	for (let i = 0; i < level; i++) {
		operation.operands.push(getRandom(base + getRandomArbitrary(-1, 1)));
		if (i + 1 === level) break;
		operation.operators.push(generateOperand());
	}
	operation.operands.sort((a, b) => b - a);

	const result = calculateResult(operation);

	if (result < 0) return generateOperation(base, level);
	return { ...operation, result };
}

function calculateResult({ operands, operators }: Pick<TOperations, 'operands' | 'operators'>): number {
	return operators.reduce((acc, operator, index) => {
		return calculate(acc, operands[index + 1], operator);
	}, operands[0]);
}

export const generateNumber = async (base = 2, size = 5, level = 3): Promise<ArithmeticOperation> => {
	const response: ArithmeticOperation = { operations: [] };
	for (let i = 0; i < size; i++) {
		const operation: TOperations = generateOperation(base, level);
		response.operations.push(operation);
	}

	return response;
};
