import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

interface AppInputProps extends Omit<TextInputProps, 'editable'> {
    label: string;
    disabled?: boolean;
    helperText?: string;
}

export function AppInput({
                             label,
                             disabled = false,
                             helperText,
                             style,
                             onFocus,
                             onBlur,
                             ...rest
                         }: AppInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, disabled && styles.labelDisabled]}>
                {label}
            </Text>

            <TextInput
                {...rest}
                editable={!disabled}
                selectTextOnFocus={!disabled}
                placeholderTextColor={colors.textDisabled}
                onFocus={(e) => {
                    setIsFocused(true);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    onBlur?.(e);
                }}
                style={[
                    styles.input,
                    isFocused && !disabled && styles.inputFocused,
                    disabled && styles.inputDisabled,
                    style,
                ]}
            />

            {helperText ? (
                <Text style={styles.helperText}>{helperText}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    labelDisabled: {
        color: colors.textDisabled,
    },
    input: {
        height: 48,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        borderWidth: 1.5,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        fontSize: 16,
        color: colors.textPrimary,
    },
    inputFocused: {
        borderColor: colors.primary,
    },
    inputDisabled: {
        backgroundColor: colors.surfaceDisabled,
        borderColor: colors.borderDisabled,
        color: colors.textDisabled,
    },
    helperText: {
        fontSize: 12,
        color: colors.textSecondary,
    },
});