import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightColors, DarkColors } from '../constants/theme';

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
    theme: ThemeType;
    colors: typeof LightColors;
    isDark: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeType>(systemColorScheme === 'light' ? 'light' : 'dark');

    useEffect(() => {
        // Load persisted theme
        const isServer = typeof window === 'undefined';
        if (isServer) return;

        AsyncStorage.getItem('theme').then((savedTheme) => {
            if (savedTheme === 'light' || savedTheme === 'dark') {
                setTheme(savedTheme);
            }
        });
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (typeof window !== 'undefined') {
            AsyncStorage.setItem('theme', newTheme);
        }
    };

    const colors = theme === 'light' ? LightColors : DarkColors;
    const isDark = theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, colors, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
