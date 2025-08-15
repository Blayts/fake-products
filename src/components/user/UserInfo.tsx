import { Button } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { genders, moods } from '../../constants/user';
import { UserForm } from './UserForm';
import type { UserValue } from '../../types/user';
import { selectUser, updateUser } from '../../slices/userSlice';

export function UserInfo() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);    
    const { color, icon: Icon } = moods[user.mood] ?? moods.neutral;

    function handleSave(values: UserValue) {
        setOpen(false);
        dispatch(updateUser(values));
    }

    function WelcomeMessage() {
        return (
            user.name && (
                <b>
                    Hi, {user.gender === genders[0] ? 'Mrs' : 'Mr'} {user.name}
                </b>
            )
        );
    }

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <WelcomeMessage></WelcomeMessage>
            <Button
                color={color}
                icon={<Icon></Icon>}
                onClick={() => setOpen(true)}
                style={{ fontSize: '1.5rem' }}
                variant="link"
            ></Button>
            <UserForm
                onClose={() => setOpen(false)}
                onSave={handleSave}
                open={open}
                user={user}
            ></UserForm>
        </div>
    );
}
