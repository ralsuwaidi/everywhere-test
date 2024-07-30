'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getVillas } from '@/utils/api';
import useAuthStore from '@/store/useAuthStore';
import VillaTable from '@/components/VillaTable';

interface Villa {
    id: string;
    name: string;
    description: string;
    // Add other villa properties as needed
}

export default function VillasPage() {
    const [villas, setVillas] = useState<Villa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated, user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndFetchVillas = async () => {
            if (!isAuthenticated()) {
                router.push('/login');
                return;
            }

            try {
                setLoading(true);
                const data = await getVillas();
                console.log('Fetched villas:', data);
                setVillas(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching villas:', error);
                setError('Failed to fetch villas. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetchVillas();
    }, [isAuthenticated, router]);

    if (loading) {
        return <main className="container mx-auto p-4"><div>Loading...</div></main>;
    }

    if (error) {
        return <main className="container mx-auto p-4"><div>Error: {error}</div></main>;
    }

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
            <VillaTable villas={villas} />
        </main>
    );
}