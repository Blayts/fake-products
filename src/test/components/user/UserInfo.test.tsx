import { Provider, useDispatch } from 'react-redux';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { UserInfo } from '../../../components/user/UserInfo';
import { genders, moods } from '../../../constants/user';
import { updateUser } from '../../../slices/userSlice';
import { store } from '../../../store';

function Component() {
    const dispatch = useDispatch();

    dispatch(
        updateUser({
            gender: genders[0],
            mood: moods.bad.value,
            name: 'John',
        })
    );

    return <UserInfo></UserInfo>;
}

describe('Render user info', () => {
    test('Default render', () => {
        const component = render(
            <Provider store={store}>
                <Component></Component>
            </Provider>
        );

        expect(component.container).toMatchSnapshot();
    });
});
