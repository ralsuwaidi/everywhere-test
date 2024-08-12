'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/catalyst/input';
import { Text } from '@/components/catalyst/text';
import { Button } from '@/components/catalyst/button';
import { getRoom, patchRoom } from '@/lib/api';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst/fieldset';

interface Room {
    id: number;
    name: string;
    single_beds: number;
    double_beds: number;
    king_beds: number;
    queen_beds: number;
    max_occupancy: number;
}

const RoomFormPage = ({ params }: { params: { slug: string, id: string } }) => {
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<Room, 'id'>>({
        name: '',
        single_beds: 0,
        double_beds: 0,
        king_beds: 0,
        queen_beds: 0,
        max_occupancy: 0,
    });
    const router = useRouter();

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await getRoom(params.slug, params.id);
                setRoom(response);
                setFormData({
                    name: response.name,
                    single_beds: response.single_beds,
                    double_beds: response.double_beds,
                    king_beds: response.king_beds,
                    queen_beds: response.queen_beds,
                    max_occupancy: response.max_occupancy,
                });
            } catch (err) {
                setError('Error fetching room data');
            } finally {
                setLoading(false);
            }
        };

        fetchRoomData();
    }, [params.slug, params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await patchRoom(params.slug, params.id, formData);
            router.push(`/villas/${params.slug}/rooms`);
        } catch (err) {
            setError('Error updating room data');
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Fieldset>
                <Legend>Edit Room</Legend>
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
                <Button className="mt-8" type="submit">Submit</Button>
            </Fieldset>
        </form>
    );
};

export default RoomFormPage;
