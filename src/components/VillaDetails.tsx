import React from 'react';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from './catalyst/description-list';
import { Divider } from './catalyst/divider';
import { Text } from './catalyst/text';
import { Button } from './catalyst/button';
import { PlusIcon } from '@heroicons/react/16/solid';

const VillaDetails: React.FC<Villa> = ({ villa }) => (
    <>
        <p className="text-3xl mb-8">{villa.name}</p>

        <DescriptionList>
            <DescriptionTerm>Name</DescriptionTerm>
            <DescriptionDetails>{villa.name}</DescriptionDetails>

            <DescriptionTerm>Description</DescriptionTerm>
            <DescriptionDetails>{villa.description}</DescriptionDetails>

            <DescriptionTerm>Email</DescriptionTerm>
            <DescriptionDetails>{villa.villa_email}</DescriptionDetails>

            <DescriptionTerm>Phone Number</DescriptionTerm>
            <DescriptionDetails>{villa.villa_phone_number}</DescriptionDetails>

            <DescriptionTerm>Check-In Time</DescriptionTerm>
            <DescriptionDetails>{villa.check_in_time}</DescriptionDetails>

            <DescriptionTerm>Check-Out Time</DescriptionTerm>
            <DescriptionDetails>{villa.check_out_time}</DescriptionDetails>

            <DescriptionTerm>Cancellation Policy</DescriptionTerm>
            <DescriptionDetails>{villa.cancellation_policy}</DescriptionDetails>

            <DescriptionTerm>Regulations</DescriptionTerm>
            <DescriptionDetails>{villa.regulations}</DescriptionDetails>

            <DescriptionTerm>Owner Has Insurance</DescriptionTerm>
            <DescriptionDetails>{villa.owner_has_insurance ? 'Yes' : 'No'}</DescriptionDetails>

            <DescriptionTerm>Insurance Amount</DescriptionTerm>
            <DescriptionDetails>{villa.insurance_amount}</DescriptionDetails>

            <DescriptionTerm>Max Adult Guests</DescriptionTerm>
            <DescriptionDetails>{villa.max_adult_guests}</DescriptionDetails>

            <DescriptionTerm>Max Child Guests</DescriptionTerm>
            <DescriptionDetails>{villa.max_child_guests}</DescriptionDetails>

            <DescriptionTerm>Review Status</DescriptionTerm>
            <DescriptionDetails>{villa.review_status}</DescriptionDetails>

            <DescriptionTerm>Area (sq feet)</DescriptionTerm>
            <DescriptionDetails>{villa.area_sq_feet}</DescriptionDetails>

            <DescriptionTerm>Booking Advance Notice</DescriptionTerm>
            <DescriptionDetails>{villa.booking_advance_notice} days</DescriptionDetails>
        </DescriptionList>

        <p className='text-2xl mt-8 mb-4 font-semibold'>Rooms</p>
        {villa.rooms.map((room, index) => (
            <div >
                <Text>Room {index + 1}</Text>
                <DescriptionList key={room.id} >
                    <DescriptionTerm>Room Name</DescriptionTerm>
                    <DescriptionDetails>{room.name}</DescriptionDetails>

                    <DescriptionTerm>Single Beds</DescriptionTerm>
                    <DescriptionDetails>{room.single_beds}</DescriptionDetails>

                    <DescriptionTerm>Double Beds</DescriptionTerm>
                    <DescriptionDetails>{room.double_beds}</DescriptionDetails>

                    <DescriptionTerm>King Beds</DescriptionTerm>
                    <DescriptionDetails>{room.king_beds}</DescriptionDetails>

                    <DescriptionTerm>Queen Beds</DescriptionTerm>
                    <DescriptionDetails>{room.queen_beds}</DescriptionDetails>

                    <DescriptionTerm>Max Occupancy</DescriptionTerm>
                    <DescriptionDetails>{room.max_occupancy}</DescriptionDetails>
                </DescriptionList>
            </div>
        ))}

        <div className='mt-8 flex space-x-4'>
            <Button>
                <PlusIcon />
                Add Room</Button>
            <Button>
                <PlusIcon />
                Add Image</Button>
        </div>
    </>
);

export default VillaDetails;
