import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AuthLayout from '../components/AuthLayout';
import GradientButton from '../components/GradientButton';
import { showSuccess } from '../utils/alerts';
import { COLORS } from '../constants/theme';

const RegisterScreen = ({ navigation, title, panel }) => {
    const targetTitle = title;
    const targetPanel = panel;

    const [form, setForm] = useState({ name: '', email: '', password: '' });

    return (
        <AuthLayout title="Register" subtitle={`Join as a ${targetTitle}`}>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput style={styles.textInput} placeholder="John Doe" value={form.name} onChangeText={t => setForm({ ...form, name: t })} />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput style={styles.textInput} placeholder="john@example.com" value={form.email} onChangeText={t => setForm({ ...form, email: t })} />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput style={styles.textInput} placeholder="••••••••" secureTextEntry value={form.password} onChangeText={t => setForm({ ...form, password: t })} />
            </View>

            <GradientButton text="CREATE ACCOUNT" onPress={() => showSuccess('Success', 'Account Created!', () => navigation.goBack())} style={{ marginTop: 20 }} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={{ color: COLORS.textSub }}>Already have an account? <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>Login</Text></Text>
            </TouchableOpacity>
        </AuthLayout>
    );
};

const styles = StyleSheet.create({
    inputGroup: { marginBottom: 20 },
    inputLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textMain, marginBottom: 8, marginLeft: 4 },
    textInput: { backgroundColor: '#fff', borderRadius: 12, padding: 16, fontSize: 16, color: COLORS.textMain, borderWidth: 1, borderColor: '#E5E7EB' },
});

export default RegisterScreen;
