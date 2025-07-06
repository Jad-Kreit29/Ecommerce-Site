import React from 'react'
import { Button } from '@/ui/button'

/**
 * OrderConfirmationModal component.
 * Displays a custom modal for order confirmation instead of native browser alert.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Function to call when the modal is closed.
 * @param {string} props.message - The message to display in the modal.
 */
const OrderConfirmationModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    // The actual modal content box, now fixed and centered without a full-screen overlay
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-xs w-full z-50 transform transition-all scale-100 opacity-100 duration-300 ease-out">
      <h2 className="text-2xl font-bold text-orange-900 mb-4 text-center">Confirmation</h2>
      <p className="text-gray-700 text-center mb-6">{message}</p>
      <div className="flex justify-center">
        <Button
          onClick={onClose}
          className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-md"
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
