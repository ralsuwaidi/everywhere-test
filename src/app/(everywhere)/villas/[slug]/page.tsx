'use client';
// app/villas/[slug]/page.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { getVillaBySlug } from '@/utils/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundry';
import VillaDetails from '@/components/VillaDetails';

export default function Page({ params }: { params: { slug: string } }) {
    const [villa, setVilla] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        async function fetchVilla() {
            if (!isAuthenticated()) {
                router.push('/login');
                return;
            }

            try {
                const data = await getVillaBySlug(params.slug);
                setVilla(data);
            } catch (err) {
                setError('Failed to fetch villa data. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        fetchVilla();
    }, [params.slug, isAuthenticated, router]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
            <main>
                {villa ? (
                    <VillaDetails villa={villa} />
                ) : (
                    <div>Villa not found</div>
                )}
            </main>
        </ErrorBoundary>
    );
}