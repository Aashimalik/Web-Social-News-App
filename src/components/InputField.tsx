import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/core';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    placeholder: string;
    textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({ label, textarea, placeholder, size: _, ...props }) => {
    const [field, { error }] = useField(props);
    let InputOrTextarea = Input;
    if(textarea) InputOrTextarea = Textarea;
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea {...field} {...props} id={field.name} placeholder={placeholder} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}