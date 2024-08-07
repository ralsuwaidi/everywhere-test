import React, { useState } from 'react';
import { Alert, AlertActions, AlertDescription, AlertTitle } from '@/components/catalyst/alert';
import { Button } from '@/components/catalyst/button';
import { createVillaRoom } from '@/lib/api';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst/fieldset';
import { Input } from '@/components/catalyst/input';
import { Text } from '@/components/catalyst/text';

function CreateRoomAlert({ villaSlug }: { villaSlug: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [roomData, setRoomData] = useState<Omit<Room, 'id'>>({
        name: '',
        single_beds: 0,
        double_beds: 0,
        king_beds: 0,
        queen_beds: 0,
        max_occupancy: 0,
    });
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRoomData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await createVillaRoom(villaSlug, roomData);
            setStatusMessage('Room created successfully!');
            setIsOpen(false);
        } catch (error) {
            setStatusMessage('Failed to create room.');
        }
    };

    return (
        <>
            <Button type="button" onClick={() => setIsOpen(true)}>
                <PlusIcon />
                Add Room
            </Button>

            <Alert open={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <AlertTitle>Add Room</AlertTitle>
                    <AlertDescription>
                        <Fieldset>
                            <Legend>Room Details</Legend>
                            <Text>Please provide the details for the new room.</Text>
                            <FieldGroup>
                                <Field>
                                    <Label>Room Name</Label>
                                    <Input name="name" value={roomData.name} onChange={handleChange} required />
                                </Field>
                                <Field>
                                    <Label>Single Beds</Label>
                                    <Input type="number" name="single_beds" value={roomData.single_beds} onChange={handleChange} required />
                                </Field>
                                <Field>
                                    <Label>Double Beds</Label>
                                    <Input type="number" name="double_beds" value={roomData.double_beds} onChange={handleChange} required />
                                </Field>
                                <Field>
                                    <Label>King Beds</Label>
                                    <Input type="number" name="king_beds" value={roomData.king_beds} onChange={handleChange} required />
                                </Field>
                                <Field>
                                    <Label>Queen Beds</Label>
                                    <Input type="number" name="queen_beds" value={roomData.queen_beds} onChange={handleChange} required />
                                </Field>
                                <Field>
                                    <Label>Max Occupancy</Label>
                                    <Input type="number" name="max_occupancy" value={roomData.max_occupancy} onChange={handleChange} required />
                                    <Description>The maximum number of guests this room can accommodate.</Description>
                                </Field>
                            </FieldGroup>
                        </Fieldset>
                    </AlertDescription>
                    <AlertActions>
                        <Button plain onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Create Room</Button>
                    </AlertActions>
                </form>
            </Alert>
            {statusMessage && <p>{statusMessage}</p>}
        </>
    );
}

export default CreateRoomAlert;