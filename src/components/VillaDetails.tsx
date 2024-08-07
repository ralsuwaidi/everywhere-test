import React from 'react';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from './catalyst/description-list';
import { Text } from './catalyst/text';
import { Button } from './catalyst/button';
import { PlusIcon } from '@heroicons/react/16/solid';
import UploadImageBtn from './UploadImageBtn';
import { useRouter } from 'next/navigation';

import VillaBadges from './VillaBadges';

const VillaDetails: React.FC<Villa> = ({ villa }: Villa) => {
    const router = useRouter();


    return (
        <>
            <div className='mb-8'>
                <VillaBadges villa={villa} />
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
                <UploadImageBtn slug={villa.slug} />
                <Button className='hover:cursor-pointer' onClick={() => router.push(`${villa.slug}/rooms/`)}>
                    Rooms
                </Button>
            </div>
        </>
    )
};

export default VillaDetails;
