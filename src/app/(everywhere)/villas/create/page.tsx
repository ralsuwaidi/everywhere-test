'use client';

import { useCallback } from 'react';
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/catalyst/checkbox';
import { Divider } from '@/components/catalyst/divider';
import { Description, Field, Fieldset, Label, Legend } from '@/components/catalyst/fieldset';
import { Input } from '@/components/catalyst/input';
import { Textarea } from '@/components/catalyst/textarea';
import { createVilla } from '@/lib/api'; // Adjust the import path as necessary
import { Button } from '@/components/catalyst/button';

export default function Page() {
    const handleSubmit = useCallback(async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Extract basic data
        const data: any = {
            name: formData.get('name'),
            description: formData.get('description'),
            villa_email: formData.get('villa_email'),
            villa_phone_number: formData.get('villa_phone_number'),
            check_in_time: formData.get('check_in_time'),
            check_out_time: formData.get('check_out_time'),
            cancellation_policy: formData.get('cancellation_policy'),
            regulations: formData.get('regulations'),
            owner_has_insurance: formData.get('owner_has_insurance') === 'on',
            insurance_amount: parseFloat(formData.get('insurance_amount') as string),
            max_adult_guests: parseInt(formData.get('max_adult_guests') as string, 10),
            max_child_guests: parseInt(formData.get('max_child_guests') as string, 10),
            area_sq_feet: parseFloat(formData.get('area_sq_feet') as string),
            booking_advance_notice: parseInt(formData.get('booking_advance_notice') as string, 10),
            rooms: [],
        };

        // Extract room data
        const rooms = [];
        for (let i = 0; formData.has(`rooms[${i}][name]`); i++) {
            rooms.push({
                name: formData.get(`rooms[${i}][name]`),
                single_beds: parseInt(formData.get(`rooms[${i}][single_beds]`) as string, 10),
                double_beds: parseInt(formData.get(`rooms[${i}][double_beds]`) as string, 10),
                king_beds: parseInt(formData.get(`rooms[${i}][king_beds]`) as string, 10),
                queen_beds: parseInt(formData.get(`rooms[${i}][queen_beds]`) as string, 10),
                max_occupancy: parseInt(formData.get(`rooms[${i}][max_occupancy]`) as string, 10),
            });
        }
        data.rooms = rooms;


        try {
            const response = await createVilla(data);
            console.log('Villa created successfully:', response);
        } catch (error) {
            console.error('Error creating villa:', error);
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className="mx-4 flex flex-col space-y-8">
            <Field>
                <Label>Villa Name</Label>
                <Description>The name of the villa</Description>
                <Input type="text" name="name" />
            </Field>
            <Field>
                <Label>Description</Label>
                <Description>Details about the villa</Description>
                <Textarea name="description" />
            </Field>
            <Field>
                <Label>Villa Email</Label>
                <Description>Email for villa contact</Description>
                <Input type="email" name="villa_email" />
            </Field>
            <Field>
                <Label>Villa Phone Number</Label>
                <Description>Contact number for the villa</Description>
                <Input type="tel" name="villa_phone_number" />
            </Field>
            <Field>
                <Label>Check-in Time</Label>
                <Description>Time for guests to check-in</Description>
                <Input type="time" name="check_in_time" />
            </Field>
            <Field>
                <Label>Check-out Time</Label>
                <Description>Time for guests to check-out</Description>
                <Input type="time" name="check_out_time" />
            </Field>
            <Field>
                <Label>Cancellation Policy</Label>
                <Description>Policy for cancellations</Description>
                <Textarea name="cancellation_policy" />
            </Field>
            <Field>
                <Label>Regulations</Label>
                <Description>Villa regulations</Description>
                <Textarea name="regulations" />
            </Field>
            <Fieldset>
                <Legend>Insurance</Legend>
                <CheckboxGroup>
                    <CheckboxField>
                        <Checkbox name="owner_has_insurance" />
                        <Label>Owner Has Insurance</Label>
                        <Description>Does the owner have insurance?</Description>
                    </CheckboxField>
                </CheckboxGroup>
            </Fieldset>
            <Field>
                <Label>Insurance Amount</Label>
                <Description>Amount of insurance coverage</Description>
                <Input type="number" name="insurance_amount" />
            </Field>
            <Field>
                <Label>Max Adult Guests</Label>
                <Description>Maximum number of adult guests</Description>
                <Input type="number" name="max_adult_guests" />
            </Field>
            <Field>
                <Label>Max Child Guests</Label>
                <Description>Maximum number of child guests</Description>
                <Input type="number" name="max_child_guests" />
            </Field>
            <Field>
                <Label>Area (sq feet)</Label>
                <Description>Area of the villa in square feet</Description>
                <Input type="number" name="area_sq_feet" />
            </Field>
            <Field>
                <Label>Booking Advance Notice (days)</Label>
                <Description>Advance notice required for booking</Description>
                <Input type="number" name="booking_advance_notice" />
            </Field>

            <Divider />

            <Fieldset>
                <Legend>Room 1</Legend>
                <Field>
                    <Label>Room Name</Label>
                    <Description>The name of the room</Description>
                    <Input type="text" name="rooms[0][name]" />
                </Field>
                <Field>
                    <Label>Single Beds</Label>
                    <Description>Number of single beds in the room</Description>
                    <Input type="number" name="rooms[0][single_beds]" />
                </Field>
                <Field>
                    <Label>Double Beds</Label>
                    <Description>Number of double beds in the room</Description>
                    <Input type="number" name="rooms[0][double_beds]" />
                </Field>
                <Field>
                    <Label>King Beds</Label>
                    <Description>Number of king beds in the room</Description>
                    <Input type="number" name="rooms[0][king_beds]" />
                </Field>
                <Field>
                    <Label>Queen Beds</Label>
                    <Description>Number of queen beds in the room</Description>
                    <Input type="number" name="rooms[0][queen_beds]" />
                </Field>
                <Field>
                    <Label>Max Occupancy</Label>
                    <Description>Maximum occupancy of the room</Description>
                    <Input type="number" name="rooms[0][max_occupancy]" />
                </Field>
            </Fieldset>

            {/* Add more rooms as needed */}

            <Button type="submit">
                Submit
            </Button>
        </form>
    );
}
