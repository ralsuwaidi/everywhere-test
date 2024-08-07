'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/catalyst/dropdown';
import { EllipsisHorizontalIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { getDeals, deleteDeal } from '@/lib/api';  // Assuming similar API functions for deals
import { Text } from '@/components/catalyst/text';
import { Button } from '@/components/catalyst/button';


function DealTable({ params }: { params: { slug: string } }) {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchDeals = async () => {
        try {
            const response = await getDeals(params.slug);
            setDeals(response);
        } catch (err) {
            setError('Error fetching deals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeals();
    }, [params.slug]);

    const handleView = (dealId: number) => {
        router.push(`deals/${dealId}`);
    };

    const handleDelete = async (dealId: number) => {
        try {
            await deleteDeal(params.slug, dealId.toString());
            fetchDeals();
        } catch (err) {
            setError('Error deleting deal');
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
            {deals.length === 0 ? (
                <div className="flex justify-center mt-4">
                    <Button onClick={() => router.push(`deals/create`)}>
                        Create Deal
                    </Button>
                </div>
            ) : (
                <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Deal Type</TableHeader>
                            <TableHeader>Discount Value</TableHeader>
                            <TableHeader>Start Date</TableHeader>
                            <TableHeader>End Date</TableHeader>
                            <TableHeader className="relative w-0">
                                <span className="sr-only">Actions</span>
                            </TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deals.map((deal) => (
                            <TableRow key={deal.id}>
                                <TableCell className="font-medium">{deal.id}</TableCell>
                                <TableCell>{deal.name}</TableCell>
                                <TableCell>{deal.deal_type}</TableCell>
                                <TableCell>{deal.discount_value}</TableCell>
                                <TableCell>{deal.display_start_date}</TableCell>
                                <TableCell>{deal.display_end_date}</TableCell>
                                <TableCell>
                                    <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                        <Dropdown>
                                            <DropdownButton plain aria-label="More options">
                                                <EllipsisHorizontalIcon />
                                            </DropdownButton>
                                            <DropdownMenu anchor="bottom end">
                                                <DropdownItem onClick={() => handleView(deal.id)}>View</DropdownItem>
                                                <DropdownItem onClick={() => handleDelete(deal.id)}>Delete</DropdownItem>
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

export default DealTable;
