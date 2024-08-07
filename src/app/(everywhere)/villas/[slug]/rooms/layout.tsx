'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Heading } from '@/components/catalyst/heading';
import { Button } from '@/components/catalyst/button';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const slug = pathname.split('/')[2];

    return (
        <div>
            <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
                <Heading>Rooms</Heading>
                <div className="flex gap-4">
                    <Button className=' hover:cursor-pointer' onClick={() => window.location.href = '/villas/' + slug + '/rooms'} outline>Rooms</Button>
                </div>
            </div>
            <div className="mt-8">
                {children}
            </div>
        </div>
    );
};

export default Layout;
