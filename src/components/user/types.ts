import type { ButtonProps } from 'antd';

export type GenderVariant = 'female' | 'male';

export type MoodVariant = 'bad' | 'happy' | 'neutral';
export type MoodValue = {
    color: ButtonProps['color'];
    icon: any;
    value: MoodVariant;
};

export type UserValue = {
    gender: GenderVariant;
    name: string;
    mood: MoodVariant;
};