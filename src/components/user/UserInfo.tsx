import { Button } from 'antd';
import { useState } from 'react';
import { genders, moods } from './constants';
import { UserForm } from './UserForm';
import type { UserValue } from './types';

export function UserInfo() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<UserValue>({
        gender: genders[0],
        name: 'Unknown',
        mood: moods.neutral.value,
    });
    const { color, icon: Icon } = moods[user.mood] ?? moods.neutral;    

    function handleSave(values: UserValue) {
        setOpen(false);
        setUser({ ...user, ...values });
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
