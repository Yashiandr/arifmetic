'use client';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
} from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { Label } from '@/shared/ui/label/label';
import { createContext, useContext, useId, type ComponentProps, type HTMLAttributes, type Ref } from 'react';

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = useContext(FormFieldContext);
	const itemContext = useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>');
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = ({ className, ref, ...props }: HTMLAttributes<HTMLDivElement> & { ref: Ref<HTMLDivElement> }) => {
	const id = useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div ref={ref} className={cn('space-y-2', className)} {...props} />
		</FormItemContext.Provider>
	);
};
FormItem.displayName = 'FormItem';

const FormLabel = ({ className, ref, ...props }: ComponentProps<typeof LabelPrimitive.Root>) => {
	const { error, formItemId } = useFormField();

	return (
		<Label ref={ref} className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props} />
	);
};
FormLabel.displayName = 'FormLabel';

const FormControl = ({ ...props }: ComponentProps<typeof Slot>) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

	return (
		<Slot
			id={formItemId}
			aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
			aria-invalid={!!error}
			{...props}
		/>
	);
};
FormControl.displayName = 'FormControl';

const FormDescription = ({
	className,
	ref,
	...props
}: HTMLAttributes<HTMLParagraphElement> & { ref: Ref<HTMLParagraphElement> }) => {
	const { formDescriptionId } = useFormField();

	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn('text-[0.8rem] text-muted-foreground', className)}
			{...props}
		/>
	);
};
FormDescription.displayName = 'FormDescription';

const FormMessage = ({
	className,
	ref,
	children,
	...props
}: HTMLAttributes<HTMLParagraphElement> & { ref: Ref<HTMLParagraphElement> }) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message) : children;

	if (!body) {
		return null;
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn('text-[0.8rem] font-medium text-destructive', className)}
			{...props}
		>
			{body}
		</p>
	);
};
FormMessage.displayName = 'FormMessage';

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
