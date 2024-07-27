'use client';

import { useEffect, useState } from 'react';
import { getVillas } from '@/utils/api'; // Adjust the import path as necessary

export default function Page() {
    const [villas, setVillas] = useState([]);

    useEffect(() => {
        const fetchVillas = async () => {
            try {
                const data = await getVillas();
                setVillas(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching villas:', error);
            }
        };

        fetchVillas();
    }, []);

    return (
        <main className="">
            <div>

            </div>
        </main>
    );
}
