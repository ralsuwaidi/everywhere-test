'use client';

import { Avatar } from '@/components/catalyst/avatar'
import {
    Dropdown,
    DropdownButton,
    DropdownDivider,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
} from '@/components/catalyst/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/catalyst/navbar'
import {
    Sidebar as CatalystSidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarHeading,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer,
} from '@/components/catalyst/sidebar'
import { SidebarLayout } from '@/components/catalyst/sidebar-layout'
import useAuthStore from '@/store/useAuthStore'
import { getGravatarUrl } from '@/utils/gravatar';
import {
    ArrowRightStartOnRectangleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    Cog8ToothIcon,
    LightBulbIcon,
    PlusIcon,
    ShieldCheckIcon,
    UserIcon,
} from '@heroicons/react/16/solid'
import {
    Cog6ToothIcon,
    HomeIcon,
    InboxIcon,
    MagnifyingGlassIcon,
    PlusCircleIcon,
    MegaphoneIcon,
    QuestionMarkCircleIcon,
    SparklesIcon,
    Square2StackIcon,
    TicketIcon,
} from '@heroicons/react/20/solid'
import { useEffect } from 'react';

interface SidebarProps {
    children: React.ReactNode
}

export default function Sidebar({ children }: SidebarProps) {

    const { user, fetchCurrentUser } = useAuthStore();

    useEffect(() => {
        if (user === null) {
            const fetchData = async () => {
                await fetchCurrentUser();
            };
            fetchData();
        }
    }, [user, fetchCurrentUser]);



    return (
        <SidebarLayout
            navbar={
                <Navbar>
                    <NavbarSpacer />
                    <NavbarSection>
                        <NavbarItem href="/search" aria-label="Search">
                            <MagnifyingGlassIcon />
                        </NavbarItem>
                        <NavbarItem href="/villas/create" aria-label="create-villa">
                            <PlusCircleIcon />
                        </NavbarItem>
                        <Dropdown>
                            <DropdownButton as={NavbarItem}>
                                <Avatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" square />
                            </DropdownButton>
                            <DropdownMenu className="min-w-64" anchor="bottom end">
                                <DropdownItem href="/my-profile">
                                    <UserIcon />
                                    <DropdownLabel>My profile</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/settings">
                                    <Cog8ToothIcon />
                                    <DropdownLabel>Settings</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/privacy-policy">
                                    <ShieldCheckIcon />
                                    <DropdownLabel>Privacy policy</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/share-feedback">
                                    <LightBulbIcon />
                                    <DropdownLabel>Share feedback</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/logout">
                                    <ArrowRightStartOnRectangleIcon />
                                    <DropdownLabel>Sign out</DropdownLabel>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarSection>
                </Navbar>
            }
            sidebar={
                <CatalystSidebar>
                    <SidebarHeader>
                        <Dropdown>
                            <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                                <Avatar slot="icon" initials="OW" className="bg-purple-500 text-white" />
                                <SidebarLabel>Everywhere</SidebarLabel>
                                <ChevronDownIcon />
                            </DropdownButton>
                            <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                                <DropdownItem href="/teams/1/settings">
                                    <Cog8ToothIcon />
                                    <DropdownLabel>Settings</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/teams/1">
                                    <Avatar slot="icon" initials="OW" className="bg-purple-500 text-white" />
                                    <DropdownLabel>Owner</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/teams/2">
                                    <Avatar slot="icon" initials="US" className="bg-green-500 text-white" />
                                    <DropdownLabel>User</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/teams/3">
                                    <Avatar slot="icon" initials="GU" className="bg-blue-500 text-white" />
                                    <DropdownLabel>Guest</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/teams/create">
                                    <PlusIcon />
                                    <DropdownLabel>New Account&hellip;</DropdownLabel>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <SidebarSection className="max-lg:hidden">
                            <SidebarItem href="/search">
                                <MagnifyingGlassIcon />
                                <SidebarLabel>Search</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/villas/create">
                                <PlusCircleIcon />
                                <SidebarLabel>Create Villa</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                    </SidebarHeader>
                    <SidebarBody>
                        <SidebarSection>
                            <SidebarItem href="/villas">
                                <HomeIcon />
                                <SidebarLabel>Villas</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                        <SidebarSection className="max-lg:hidden">
                            <SidebarHeading>Upcoming Events</SidebarHeading>
                            <SidebarItem href="/events/1">Bear Hug: Live in Concert</SidebarItem>
                            <SidebarItem href="/events/2">Viking People</SidebarItem>
                            <SidebarItem href="/events/3">Six Fingers — DJ Set</SidebarItem>
                            <SidebarItem href="/events/4">We All Look The Same</SidebarItem>
                        </SidebarSection>
                        <SidebarSpacer />
                        <SidebarSection>
                            <SidebarItem href="/support">
                                <QuestionMarkCircleIcon />
                                <SidebarLabel>Support</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/changelog">
                                <SparklesIcon />
                                <SidebarLabel>Changelog</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                    </SidebarBody>
                    <SidebarFooter className="max-lg:hidden">
                        <Dropdown>
                            <DropdownButton as={SidebarItem}>
                                <span className="flex min-w-0 items-center gap-3">
                                    <Avatar
                                        src={getGravatarUrl(user?.email || 'default@example.com')}
                                        className="size-10"
                                        square
                                        alt=""
                                    />
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                                            {user?.name || 'no name'}
                                        </span>
                                        <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                                            {user?.email}
                                        </span>
                                    </span>
                                </span>
                                <ChevronUpIcon />
                            </DropdownButton>





                            <DropdownMenu className="min-w-64" anchor="top start">
                                <DropdownItem href="/my-profile">
                                    <UserIcon />
                                    <DropdownLabel>My profile</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/settings">
                                    <Cog8ToothIcon />
                                    <DropdownLabel>Settings</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/privacy-policy">
                                    <ShieldCheckIcon />
                                    <DropdownLabel>Privacy policy</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/share-feedback">
                                    <LightBulbIcon />
                                    <DropdownLabel>Share feedback</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/logout">
                                    <ArrowRightStartOnRectangleIcon />
                                    <DropdownLabel>Sign out</DropdownLabel>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </SidebarFooter>
                </CatalystSidebar>
            }
        >
            {children}

        </SidebarLayout>
    )

}