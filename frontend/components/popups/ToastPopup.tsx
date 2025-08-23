import React, { useEffect } from 'react';
import { Loader } from 'lucide-react';

interface LoadingToastProps {
  message?: string;
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
}

export const ToastPopup: React.FC<LoadingToastProps> = ({
  message = 'Loading...',
  isVisible,
}) => {


  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg px-4 py-3 flex items-center space-x-2">
        <Loader className="h-4 w-4 animate-spin text-gray-600" />
        <span className="text-gray-800 text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};