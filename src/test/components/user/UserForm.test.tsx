import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UserForm } from '../../../components/user/UserForm';
import { genders, moods } from '../../../constants/user';
import type { UserValue } from '../../../types/user';

const state = {
    onClose() {},
    onSave() {},
    open: true,
    user: {
        gender: genders[0],
        name: 'John',
        mood: moods.happy.value
    } as UserValue
};

describe('Render user form', () => {
    const { getComputedStyle } = window;

    window.getComputedStyle = (el) => getComputedStyle(el);

    test('Default render', async () => {
        vi.spyOn(state, 'onClose');
        vi.spyOn(state, 'onSave');
        render(<UserForm {...state}></UserForm>);
        
        const inputName = screen.getByDisplayValue(state.user.name);

        expect(inputName).toBeDefined();
        expect(screen.getByDisplayValue(state.user.gender)).toBeDefined();
        expect(screen.getByTitle(state.user.mood)).toBeDefined();

        const btnSave = screen.getByText('Save').closest('button') as HTMLButtonElement;

        expect(btnSave).toHaveProperty('disabled');

        fireEvent.change(inputName, { target: { value: 'Bob' }});
        fireEvent.click(btnSave);

        await waitFor(() => expect(state.onSave).toHaveBeenCalledWith({
            ...state.user,
            name: 'Bob'
        }));

        const btnClose = screen.getByLabelText<HTMLButtonElement>('Close');

        fireEvent.click(btnClose);

        await waitFor(() => expect(state.onClose).toHaveBeenCalled());
    })
});