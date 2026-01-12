import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

const AuthLayout = ({ children, title, subtitle }) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={styles.headerGradient}>
            <SafeAreaView>
                <View style={styles.authHeader}>
                    <Text style={styles.authTitle}>{title}</Text>
                    <Text style={styles.authSubtitle}>{subtitle}</Text>
                </View>
            </SafeAreaView>
        </LinearGradient>
        <View style={styles.authContent}>
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
                {children}
            </ScrollView>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    headerGradient: { height: 200, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    authHeader: { marginTop: 40 },
    authTitle: { fontSize: 32, fontWeight: '800', color: '#fff' },
    authSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
    authContent: { flex: 1, marginTop: -30, backgroundColor: COLORS.background, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
});

export default AuthLayout;
