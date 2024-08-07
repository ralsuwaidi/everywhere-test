import { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { Badge } from "./catalyst/badge";
import { getPricing } from '@/lib/api';

interface Villa {
    name: string;
    review_status: string;
    rooms: any[];
    images: any[];
    slug: string;
}

export default function VillaBadges({ villa }: { villa: Villa }) {
    const [pricingExists, setPricingExists] = useState(false);

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const pricing = await getPricing(villa.slug);
                setPricingExists(pricing.length > 0);
            } catch (err) {
                console.error('Error fetching pricing data', err);
                setPricingExists(false);
            }
        };

        fetchPricing();
    }, [villa.slug]);

    return (
        <div className='flex space-x-4 mt-2'>
            <Badge>{villa.review_status === "DR" ? "Draft" : "Published"}</Badge>
            <Badge color={villa.rooms.length > 0 ? 'green' : 'red'}>
                {villa.rooms.length > 0 ? (
                    <CheckCircleIcon className="w-4 h-4" />
                ) : (
                    <XCircleIcon className="w-4 h-4" />
                )}
                Rooms
            </Badge>
            <Badge color={villa.images.length > 0 ? 'green' : 'red'}>
                {villa.images.length > 0 ? (
                    <CheckCircleIcon className="w-4 h-4" />
                ) : (
                    <XCircleIcon className="w-4 h-4" />
                )}
                Images
            </Badge>
            <Badge color={pricingExists ? 'green' : 'red'}>
                {pricingExists ? (
                    <CheckCircleIcon className="w-4 h-4" />
                ) : (
                    <XCircleIcon className="w-4 h-4" />
                )}
                Pricing
            </Badge>
        </div>
    );
}
