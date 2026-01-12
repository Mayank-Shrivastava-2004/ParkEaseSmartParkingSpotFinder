import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AuthLayout from '../components/AuthLayout';
import GradientButton from '../components/GradientButton';
import { showError } from '../utils/alerts';
import { COLORS } from '../constants/theme';

const LoginScreen = ({ navigation, title, panel, dashboardScreen }) => {
    // Extract params from route if available, or use props passed via screen options wrapper (if using that pattern)
    // However, simpler to rely on route.params if we change navigation structure.
    // But purely based on App.js, props were passed directly via a render callback.
    // We'll assume the props are passed down correctly.


    // Wait, in App.js it was: <Stack.Screen name="AdminLogin">{props => <LoginScreen {...props} title="Admin" ... />}</Stack.Screen>
    // So `title` and others are direct props.

    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (!form.email || !form.password) return showError('Error', 'Please enter email & password');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.replace(dashboardScreen);
        }, 1000);
    };

    return (
        <AuthLayout title="Login" subtitle={`Welcome to ${panel}`}>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="user@example.com"
                    value={form.email}
                    onChangeText={t => setForm({ ...form, email: t })}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    secureTextEntry
                    value={form.password}
                    onChangeText={t => setForm({ ...form, password: t })}
                />
            </View>

            <GradientButton text="LOGIN" onPress={handleLogin} loading={loading} style={{ marginTop: 20 }} />

            <TouchableOpacity onPress={() => navigation.navigate(title + 'Register')} style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={{ color: COLORS.textSub }}>New here? <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>Create Account</Text></Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 30, alignItems: 'center' }}>
                <Text style={{ color: COLORS.textSub }}>Go Back</Text>
            </TouchableOpacity>
        </AuthLayout>
    );
};

const styles = StyleSheet.create({
    inputGroup: { marginBottom: 20 },
    inputLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textMain, marginBottom: 8, marginLeft: 4 },
    textInput: { backgroundColor: '#fff', borderRadius: 12, padding: 16, fontSize: 16, color: COLORS.textMain, borderWidth: 1, borderColor: '#E5E7EB' },
});

export default LoginScreen;
