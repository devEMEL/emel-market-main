import React from 'react';

interface FormInputProps {
    label: string;
    type: string;
    id: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    min?: number;
    step?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    type,
    id,
    value,
    onChange,
    required = false,
    min,
    step,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-white mb-2"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                min={min}
                step={step}
                className="w-full px-3 py-2 bg-gradient-deep border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            />
        </div>
    );
};
