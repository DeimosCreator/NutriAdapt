import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';
import { useHealthCheck } from '@/shared/api/health';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppInput } from '@/shared/components/AppInput';
import { colors, radius, spacing } from '@/shared/theme/tokens';

export default function HomeScreen() {
    const [weight, setWeight] = useState('');
    const [isFieldDisabled, setIsFieldDisabled] = useState(false);
    const { data, isFetching, isError, error, refetch } = useHealthCheck();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.card}>
                <Text style={styles.switchLabel}>Статус бэкенда</Text>
                <Text style={styles.subtitle}>
                    {isFetching
                        ? 'Проверяем соединение...'
                        : isError
                            ? `Ошибка: ${error instanceof Error ? error.message : 'Нет связи'}`
                            : `Работает: ${typeof data === 'string' ? data : JSON.stringify(data)}`}
                </Text>
                <Pressable style={styles.button} onPress={() => refetch()}>
                    <Text style={styles.buttonText}>Проверить ещё раз</Text>
                </Pressable>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>NutriAdapt</Text>
                    <Text style={styles.subtitle}>
                        Проверка текстового поля и тестовой сборки
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Заблокировать первое поле</Text>
                        <Switch
                            value={isFieldDisabled}
                            onValueChange={setIsFieldDisabled}
                            trackColor={{ false: colors.border, true: colors.primary }}
                        />
                    </View>

                    <AppInput
                        label="Текущий вес (кг)"
                        placeholder="Например, 72.5"
                        keyboardType="decimal-pad"
                        value={weight}
                        onChangeText={setWeight}
                        disabled={isFieldDisabled}
                        helperText={
                            isFieldDisabled
                                ? 'Поле сейчас неактивно (ввод заблокирован)'
                                : 'Нажмите на поле — рамка подсветится'
                        }
                    />

                    <AppInput
                        label="Расчётная норма (неактивное)"
                        value="2 150 ккал"
                        disabled
                        helperText="Всегда неактивно — заполняется системой"
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: spacing.lg,
        gap: spacing.lg,
    },
    header: {
        gap: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    card: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing.md,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    switchLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.textPrimary,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: radius.md,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.surface,
        fontSize: 15,
        fontWeight: '600',
    },
});