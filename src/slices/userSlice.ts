import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { genders, moods } from '../constants/user';
import type { UserValue } from '../types/user';

const STORAGE_KEY = 'user';

function readFromStore(): Record<string, any> {
    let result = {};

    try {
        const value = localStorage.getItem(STORAGE_KEY) || '{}';
        result = JSON.parse(value);
    }
    catch {
        console.warn('Storage empty!');
    }

    return typeof(result) !== 'object' ? {}: result;
}

function writeToStore(value: Record<string, any>) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

function getInitialState() {
    const value = readFromStore();

    return { 
        gender: value.gender || genders[0],
        name: value.name || 'Unknown',
        mood: value.mood || moods.neutral.value,
    };
}

const initialState = getInitialState();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, { payload }: PayloadAction<UserValue>) {
            state.gender = payload.gender;
            state.mood = payload.mood;
            state.name = payload.name;
            writeToStore(state);
        }
    },
    selectors: {
        selectUser(state: UserValue) {
            return state;
        }
    }
});

export const { selectUser } = userSlice.selectors;
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;