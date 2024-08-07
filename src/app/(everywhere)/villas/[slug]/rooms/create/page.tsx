'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/catalyst/input';
import { Text } from '@/components/catalyst/text';
import { Button } from '@/components/catalyst/button';
import { createRoom } from '@/lib/api';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst/fieldset';

interface Room {
    name: string;
    single_beds: number;
    double_beds: number;
    king_beds: number;
    queen_beds: number;
    max_occupancy: number;
}

const CreateRoomPage = ({ params }: { params: { slug: string } }) => {
    const [formData, setFormData] = useState<Room>({
        name: '',
        single_beds: 0,
        double_beds: 0,
        king_beds: 0,
        queen_beds: 0,
        max_occupancy: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createRoom(params.slug, formData);
            router.push(`/villas/${params.slug}/rooms`);
        } catch (err) {
            setError('Error creating room');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Fieldset>
                <Legend>Create Room</Legend>
                {error && <Text className="text-red-500">{error}</Text>}
                <FieldGroup>
                    <Field>
                        <Label>Name</Label>
                        <Input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <Label>Single Beds</Label>
                        <Input
                            name="single_beds"
                            type="number"
                            value={formData.single_beds}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <Label>Double Beds</Label>
                        <Input
                            name="double_beds"
                            type="number"
                            value={formData.double_beds}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <Label>King Beds</Label>
                        <Input
                            name="king_beds"
                            type="number"
                            value={formData.king_beds}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <Label>Queen Beds</Label>
                        <Input
                            name="queen_beds"
                            type="number"
                            value={formData.queen_beds}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <Label>Max Occupancy</Label>
                        <Input
                            name="max_occupancy"
                            type="number"
                            value={formData.max_occupancy}
                            onChange={handleChange}
                        />
                    </Field>
                </FieldGroup>
                <Button className="mt-8" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </Fieldset>
        </form>
    );
};

export default CreateRoomPage;
