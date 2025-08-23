import React from 'react';

interface FormTextAreaProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
    label,
    id,
    value,
    onChange,
    required = false,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-white mb-2"
            >
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                rows={4}
                className="w-full px-3 py-2 bg-gradient-deep border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            />
        </div>
    );
};
