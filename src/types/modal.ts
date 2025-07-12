export interface ConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;               
  message: string;          
  onConfirm: () => void;
  confirmText?: string;         
  cancelText?: string;         
}