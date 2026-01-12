import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionLine} />
    </View>
);

const styles = StyleSheet.create({
    sectionHeader: { marginBottom: 16, marginTop: 8 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },
    sectionLine: { marginTop: 4, width: 30, height: 3, backgroundColor: COLORS.primary, borderRadius: 2 },
});

export default SectionHeader;
