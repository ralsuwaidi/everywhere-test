'use client';

import { useCallback } from 'react';
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/catalyst/checkbox';
import { Divider } from '@/components/catalyst/divider';
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst/fieldset';
import { Input } from '@/components/catalyst/input';
import { Textarea } from '@/components/catalyst/textarea';
import { Button } from '@/components/catalyst/button';
import { Text } from '@/components/catalyst/text';

export default function Page() {

    const handleSubmit = useCallback((event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    }, []);

    return (
        <form onSubmit={handleSubmit} >
            <Fieldset className="mx-4 flex flex-col space-y-8">
                <div>
                    <Legend>Villa details</Legend>
                    <Text>Create a Villa</Text>
                </div>
                <FieldGroup>
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
                </FieldGroup>

                <Divider />

                <Field>
                    <Label>Room Name</Label>
                    <Description>The name of the room</Description>
                    <Input type="text" name="room_name" />
                </Field>
                <Field>
                    <Label>Single Beds</Label>
                    <Description>Number of single beds in the room</Description>
                    <Input type="number" name="single_beds" />
                </Field>
                <Field>
                    <Label>Double Beds</Label>
                    <Description>Number of double beds in the room</Description>
                    <Input type="number" name="double_beds" />
                </Field>
                <Field>
                    <Label>King Beds</Label>
                    <Description>Number of king beds in the room</Description>
                    <Input type="number" name="king_beds" />
                </Field>
                <Field>
                    <Label>Queen Beds</Label>
                    <Description>Number of queen beds in the room</Description>
                    <Input type="number" name="queen_beds" />
                </Field>
                <Field>
                    <Label>Max Occupancy</Label>
                    <Description>Maximum occupancy of the room</Description>
                    <Input type="number" name="max_occupancy" />
                </Field>
                <Button className='hover:cursor-pointer max-w-24 my-8' type="submit">Submit</Button>
            </Fieldset>
        </form>
    );
}
