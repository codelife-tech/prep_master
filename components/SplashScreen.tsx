import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSpring,
    Easing,
    runOnJS
} from 'react-native-reanimated';
import { useTheme } from '../context/theme';
import { FontSize } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface Props {
    onAnimationComplete: () => void;
}

export default function SplashScreen({ onAnimationComplete }: Props) {
    const { colors } = useTheme();

    const logoScale = useSharedValue(0.3);
    const logoOpacity = useSharedValue(0);
    const titleOpacity = useSharedValue(0);
    const titleTranslateY = useSharedValue(20);
    const containerOpacity = useSharedValue(1);

    useEffect(() => {
        // Logo animation
        logoScale.value = withSpring(1, { damping: 12 });
        logoOpacity.value = withTiming(1, { duration: 800 });

        // Title animation
        titleOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
        titleTranslateY.value = withDelay(400, withSpring(0, { damping: 12 }));

        // Exit animation
        const timeout = setTimeout(() => {
            containerOpacity.value = withTiming(0, {
                duration: 600,
                easing: Easing.out(Easing.quad)
            }, (finished) => {
                if (finished) {
                    runOnJS(onAnimationComplete)();
                }
            });
        }, 2200);

        return () => clearTimeout(timeout);
    }, []);

    const animatedLogoStyle = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value }],
        opacity: logoOpacity.value,
    }));

    const animatedTitleStyle = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
        transform: [{ translateY: titleTranslateY.value }],
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
        opacity: containerOpacity.value,
    }));

    return (
        <Animated.View style={[styles.container, { backgroundColor: colors.background }, animatedContainerStyle]}>
            <View style={styles.content}>
                <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
                    <Text style={styles.logo}>📚</Text>
                </Animated.View>
                <Animated.View style={animatedTitleStyle}>
                    <Text style={[styles.title, { color: colors.text }]}>PrepMaster GH</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Ace Your Future</Text>
                </Animated.View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        fontSize: 80,
    },
    title: {
        fontSize: FontSize.hero,
        fontWeight: '900',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: FontSize.md,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.8,
    },
});
