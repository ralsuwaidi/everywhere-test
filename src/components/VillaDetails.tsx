import React from 'react';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from './catalyst/description-list';
import { Text } from './catalyst/text';
import { Button } from './catalyst/button';
import { PlusIcon } from '@heroicons/react/16/solid';
import UploadImageBtn from './UploadImageBtn';
import { Badge } from './catalyst/badge';
import CreateRoomAlert from './AddRoomBtn';
import { deleteRoom } from '@/utils/api';

const VillaDetails: React.FC<Villa> = ({ villa }: Villa) => (
    <>
        <div className='mb-8'>
            <p className="text-3xl">{villa.name}</p>
            <div className='flex space-x-4'>
                <Badge>{villa.review_status == "DR" ? "Draft" : "Published"}</Badge>
            </div>
        </div>

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
            <div className='mt-8'>
                <Text >Room {index + 1}</Text>
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
                <Button className=' hover:cursor-pointer text-end' color='red' onClick={() => {
                    deleteRoom(villa.slug, room.id.toString())
                    window.location.reload()
                }}>Delete</Button>
            </div>
        ))}


        <p className='text-2xl mt-8 mb-4 font-semibold'>Images</p>
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {villa.images.map((image, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                    <img
                        src={image.image}
                        alt={image.image}
                        className="object-cover w-full h-full max-h-56"
                    />
                </div>
            ))}
        </div>
        <div className='mt-8 flex space-x-4'>
            <Button>
                <PlusIcon />
                Add Room
            </Button>
            <UploadImageBtn slug={villa.slug} />
            <CreateRoomAlert villaSlug={villa.slug} />
        </div>
    </>
);

export default VillaDetails;
