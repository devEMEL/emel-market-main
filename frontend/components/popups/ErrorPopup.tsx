import React from 'react';
import { X } from 'lucide-react';
import { usePopup } from '@/hooks/usePopup';

interface ErrorPopupProps {
  isOpen: boolean,
  onClose?: () => void;
  message: string;

}

export const ErrorPopup: React.FC<ErrorPopupProps> = ({
    isOpen,
    onClose,
    message
}) => {

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-deep">
      <div className="relative bg-white rounded-lg max-w-md w-full p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <X className="h-6 w-6 text-red-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Error</h2>
          <p className="text-gray-600">{message}</p>
          
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
      )
      }