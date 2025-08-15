import { Button, Drawer, Form, Input, Radio, Select } from 'antd';
import { useState } from 'react';
import { genders, optionsMood } from '../../constants/user';
import type { UserValue } from '../../types/user';

type UserFormProps = {
    onClose(): void;
    onSave(values: Record<string, number | string>): void;
    open: boolean;
    user: UserValue;
};

export function UserForm({ onClose, onSave, open, user }: UserFormProps) {
    const [changed, setChanged] = useState(false);

    function handleChange() {
        if (!changed) {
            setChanged(true);
        }
    }

    return (
        <Drawer onClose={onClose} open={open} title="User info">
            <Form
                autoComplete="false"
                initialValues={user}
                onFieldsChange={handleChange}
                onFinish={onSave}
                labelCol={{ span: 4 }}
            >
                <Form.Item label="Name" name="name">
                    <Input aria-label="name-input" maxLength={16}></Input>
                </Form.Item>           
                <Form.Item label="Gender" name="gender">
                    <Radio.Group aria-label="gender-group">
                        {genders.map((gender) => (
                            <Radio.Button key={gender} value={gender}>
                                {gender}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Mood" name="mood">
                    <Select aria-label="mood-input" options={optionsMood}></Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button
                        disabled={!changed}
                        htmlType="submit"
                        type="primary"
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
}
