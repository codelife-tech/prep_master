import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../constants/supabase';
import { Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { useRouter, Link } from 'expo-router';
import { useTheme } from '../../context/theme';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { colors } = useTheme();

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            router.replace('/');
        }
        setLoading(false);
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={styles.logo}>📚</Text>
                <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Sign in to continue your progress</Text>
            </View>

            <View style={[styles.form, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.label, { color: colors.text }]}>Email Address</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: colors.surfaceLight, borderColor: colors.border, color: colors.text }]}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.textMuted}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: colors.surfaceLight, borderColor: colors.border, color: colors.text }]}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.textMuted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.primary }, loading && styles.buttonDisabled]}
                    onPress={signInWithEmail}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Sign In</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>Don't have an account? </Text>
                    <Link href="/auth/signup" asChild>
                        <TouchableOpacity>
                            <Text style={[styles.linkText, { color: colors.primary }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.lg,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    logo: {
        fontSize: 64,
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: FontSize.xxl,
        fontWeight: '800',
    },
    subtitle: {
        fontSize: FontSize.md,
        marginTop: Spacing.xs,
    },
    form: {
        padding: Spacing.xl,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
    },
    label: {
        fontSize: FontSize.sm,
        fontWeight: '600',
        marginBottom: Spacing.xs,
        marginTop: Spacing.md,
    },
    input: {
        borderRadius: BorderRadius.sm,
        padding: Spacing.md,
        fontSize: FontSize.md,
        borderWidth: 1,
    },
    button: {
        borderRadius: BorderRadius.sm,
        padding: Spacing.md,
        alignItems: 'center',
        marginTop: Spacing.xl,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#FFF',
        fontSize: FontSize.md,
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.xl,
    },
    footerText: {
        fontSize: FontSize.sm,
    },
    linkText: {
        fontSize: FontSize.sm,
        fontWeight: '700',
    },
});
