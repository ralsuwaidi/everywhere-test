'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/catalyst/dropdown';
import { EllipsisHorizontalIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { getRooms, deleteRoom } from '@/lib/api';
import { Text } from '@/components/catalyst/text';
import { Button } from '@/components/catalyst/button';

interface Room {
    id: number;
    name: string;
    single_beds: number;
    double_beds: number;
    king_beds: number;
    queen_beds: number;
    max_occupancy: number;
}

function RoomTable({ params }: { params: { slug: string } }) {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchRooms = async () => {
        try {
            const response = await getRooms(params.slug);
            setRooms(response);
        } catch (err) {
            setError('Error fetching rooms');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [params.slug]);

    const handleView = (roomId: number) => {
        router.push(`rooms/${roomId}`);
    };

    const handleDelete = async (roomId: number) => {
        try {
            await deleteRoom(params.slug, roomId.toString());
            fetchRooms();
        } catch (err) {
            setError('Error deleting room');
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <>
            {rooms.length === 0 ? (
                <div className="flex justify-center mt-4">
                    <Button onClick={() => router.push(`rooms/${params.slug}`)}>
                        Create Room
                    </Button>
                </div>
            ) : (
                <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Single Beds</TableHeader>
                            <TableHeader>Double Beds</TableHeader>
                            <TableHeader>King Beds</TableHeader>
                            <TableHeader>Queen Beds</TableHeader>
                            <TableHeader>Max Occupancy</TableHeader>
                            <TableHeader className="relative w-0">
                                <span className="sr-only">Actions</span>
                            </TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((room) => (
                            <TableRow key={room.id}>
                                <TableCell className="font-medium">{room.id}</TableCell>
                                <TableCell>{room.name}</TableCell>
                                <TableCell>{room.single_beds}</TableCell>
                                <TableCell>{room.double_beds}</TableCell>
                                <TableCell>{room.king_beds}</TableCell>
                                <TableCell>{room.queen_beds}</TableCell>
                                <TableCell>{room.max_occupancy}</TableCell>
                                <TableCell>
                                    <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                        <Dropdown>
                                            <DropdownButton plain aria-label="More options">
                                                <EllipsisHorizontalIcon />
                                            </DropdownButton>
                                            <DropdownMenu anchor="bottom end">
                                                <DropdownItem onClick={() => handleView(room.id)}>View</DropdownItem>
                                                <DropdownItem onClick={() => handleDelete(room.id)}>Delete</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
}

export default RoomTable;
