'use client';
import { useState, useCallback } from 'react';

export const useToastify = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closePopup = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        openPopup,
        closePopup,
    };
};
