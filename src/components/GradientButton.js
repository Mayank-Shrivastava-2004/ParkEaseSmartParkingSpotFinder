import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

const GradientButton = ({ onPress, text, icon, style, loading }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.gradBtnContainer, style]} disabled={loading}>
        <LinearGradient
            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradBtn}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <>
                    {icon && <Text style={{ marginRight: 8 }}>{icon}</Text>}
                    <Text style={styles.gradBtnText}>{text}</Text>
                </>
            )}
        </LinearGradient>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    gradBtnContainer: { shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
    gradBtn: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    gradBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default GradientButton;
