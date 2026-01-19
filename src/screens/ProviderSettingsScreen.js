import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const ProviderSettingsScreen = ({ navigation }) => {
    const [pushEnabled, setPushEnabled] = React.useState(true);
    const [autoAccept, setAutoAccept] = React.useState(false);

    const sections = [
        {
            title: 'Account Settings',
            items: [
                { id: 1, label: 'Profile Details', icon: 'person', color: COLORS.primary },
                { id: 2, label: 'Business Verification', icon: 'verified-user', color: COLORS.success },
                { id: 3, label: 'Manage Locations', icon: 'map', color: COLORS.accent },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { id: 4, label: 'Push Notifications', icon: 'notifications', color: COLORS.warning, toggle: true, value: pushEnabled, onValueChange: setPushEnabled },
                { id: 5, label: 'Auto-accept Bookings', icon: 'auto-awesome', color: '#8B5CF6', toggle: true, value: autoAccept, onValueChange: setAutoAccept },
            ]
        },
        {
            title: 'Support',
            items: [
                { id: 6, label: 'Help & FAQ', icon: 'help', color: COLORS.textSub },
                { id: 7, label: 'Privacy Policy', icon: 'description', color: COLORS.textSub },
                { id: 8, label: 'Delete Account', icon: 'delete-forever', color: COLORS.error },
            ]
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {sections.map((section, idx) => (
                    <View key={idx} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.card}>
                            {section.items.map((item, i) => (
                                <View key={item.id}>
                                    <TouchableOpacity
                                        style={styles.item}
                                        disabled={item.toggle}
                                    >
                                        <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                                            <MaterialIcons name={item.icon} size={22} color={item.color} />
                                        </View>
                                        <Text style={styles.itemLabel}>{item.label}</Text>
                                        {item.toggle ? (
                                            <Switch
                                                value={item.value}
                                                onValueChange={item.onValueChange}
                                                trackColor={{ false: '#E5E7EB', true: COLORS.primary + '80' }}
                                                thumbColor={item.value ? COLORS.primary : '#F3F4F6'}
                                            />
                                        ) : (
                                            <MaterialIcons name="chevron-right" size={24} color="#D1D5DB" />
                                        )}
                                    </TouchableOpacity>
                                    {i < section.items.length - 1 && <View style={styles.divider} />}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, backgroundColor: '#fff' },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    content: { padding: 20 },
    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 14, fontWeight: '800', color: COLORS.textSub, textTransform: 'uppercase', marginBottom: 12, marginLeft: 5 },
    card: { backgroundColor: '#fff', borderRadius: 24, overflow: 'hidden', elevation: 2 },
    item: { flexDirection: 'row', alignItems: 'center', padding: 16 },
    iconBox: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    itemLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: COLORS.textMain },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 16 }
});

export default ProviderSettingsScreen;
