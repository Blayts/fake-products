import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import type { GenderVariant, MoodValue, MoodVariant } from './types';

export const genders: GenderVariant[] = ['female', 'male'];

export const moods: Record<MoodVariant, MoodValue> = {
    bad: {
        color: 'danger',
        icon: FrownOutlined,
        value: 'bad'
    },
    happy: {
        color: 'green',
        icon: SmileOutlined,
        value: 'happy'
    },
    neutral: {
        color: 'gold',
        icon: MehOutlined,
        value: 'neutral'
    },
};

export const optionsGender: SelectProps['options'] = genders.map((gender) => ({
    label: gender,
    value: gender,
}));
export const optionsMood: SelectProps['options'] = Object.keys(moods).map(
    (mood: string) => ({ label: mood, value: mood })
);
