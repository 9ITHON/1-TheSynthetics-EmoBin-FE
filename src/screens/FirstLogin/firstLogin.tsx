import React, { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './firstLogin.style';
import { useSignupStore } from '../../stores/signupStore';

const pad2 = (n: number | '') => (n === '' ? '' : String(n).padStart(2, '0'));

const FirstLogin = () => {
  const nickname    = useSignupStore((s) => s.nickname);
  const gender      = useSignupStore((s) => s.gender);
  const year        = useSignupStore((s) => s.year);
  const month       = useSignupStore((s) => s.month);
  const day         = useSignupStore((s) => s.day);

  const setNickname = useSignupStore((s) => s.setNickname);
  const setGender   = useSignupStore((s) => s.setGender);
  const setYear     = useSignupStore((s) => s.setYear);
  const setMonth    = useSignupStore((s) => s.setMonth);
  const setDay      = useSignupStore((s) => s.setDay);

  const years  = useMemo(() => Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i), []);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const days   = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

  const handleSubmit = () => {
    if (!nickname || !gender || year === '' || month === '' || day === '') {
      Alert.alert('입력 오류', '모든 항목을 입력해 주세요.');
      return;
    }
    const birthdate = `${year}-${pad2(month)}-${pad2(day)}`;
    console.log({ nickname, gender, birthdate });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable onPress={() => console.log('goBack')} hitSlop={8}>
            <Image source={require('../../../assets/Vector.png')} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.headerTitle}>회원가입</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={styles.input}
            placeholder="닉네임을 입력해주세요."
            placeholderTextColor="#9E9E9E"
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>성별</Text>
          <View style={styles.genderRow}>
            {[
              { key: 'FEMALE', label: '여성' },
              { key: 'MALE',   label: '남성' },
            ].map(({ key, label }) => (
              <Pressable key={key} style={styles.genderOption} onPress={() => setGender(key as any)}>
                <View style={[styles.radioOuter, gender === key && styles.radioOuterActive]}>
                  {gender === key && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.genderText}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>생년월일</Text>
          <View style={styles.birthRow}>
            {[
              { placeholder: '연도', value: year,   setter: setYear,   items: years  },
              { placeholder: '월',   value: month,  setter: setMonth,  items: months },
              { placeholder: '일',   value: day,    setter: setDay,    items: days   },
            ].map(({ placeholder, value, setter, items }, idx) => (
              <View
                key={placeholder}
                style={[styles.pickerWrapper, idx !== 2 && styles.pickerMargin]}
              >
                <Picker
                  mode="dropdown"
                  selectedValue={value}
                  onValueChange={setter as any}
                  dropdownIconColor="#000"
                  style={styles.picker}
                >
                  <Picker.Item label={placeholder} value="" />
                  {items.map((i) => (
                    <Picker.Item key={i} label={`${i}`} value={i} />
                  ))}
                </Picker>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
          <Text style={styles.submitText}>동의</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FirstLogin;
