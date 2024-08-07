import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { Badge } from "./catalyst/badge";

export default function VillaBadges({ villa }: Villa) {
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
            {/* <Badge color={villa ? 'green' : 'red'}>Pricing Model</Badge> */}
        </div>
    );
}
