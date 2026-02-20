import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = 'https://puytabjppyidoqqrmeqv.supabase.co';
const supabaseAnonKey = 'sb_publishable_kOdq53UPZZs1Qxvtc_vKoQ_JgAnCcop';

// Safe storage adapter for SSR
const isWeb = Platform.OS === 'web';
const isServer = isWeb && typeof window === 'undefined';

const customStorage = {
    getItem: (key: string) => {
        if (isServer) return null;
        return AsyncStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
        if (isServer) return;
        return AsyncStorage.setItem(key, value);
    },
    removeItem: (key: string) => {
        if (isServer) return;
        return AsyncStorage.removeItem(key);
    }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: customStorage as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
