import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { styles } from './ConfirmationModal.styles';
import CloseIcon from '../../../assets/icons/back.svg'; 
import { ConfirmationModalProps } from '../../types/modal';


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <CloseIcon width={24} height={24} />
          </Pressable>

          {title ? <Text style={styles.modalTitle}>{title}</Text> : null}

          <Text style={styles.modalMessage}>{message}</Text>

          <View style={styles.horizontalDivider} />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={onConfirm}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            <TouchableOpacity
              style={styles.button}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
