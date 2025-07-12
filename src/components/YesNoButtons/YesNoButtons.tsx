import React from 'react';
import { View } from 'react-native';
import Button from '../Button'; 
import { styles } from './YesNoButtons.styles';
import { YesNoButtonsProps } from '../../types/button';


const YesNoButtons = ({
  onYes,
  onNo,
  yesText = '확인',
  noText = '취소',
}: YesNoButtonsProps) => {
  return (
    <View style={styles.container}>
      <Button text={yesText} onPress={onYes} style={styles.yesButton} />
      <Button text={noText} onPress={onNo} style={styles.noButton} />
    </View>
  );
};

export default YesNoButtons;
