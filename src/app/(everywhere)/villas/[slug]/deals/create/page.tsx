'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/catalyst/input';
import { Text } from '@/components/catalyst/text';
import { Button } from '@/components/catalyst/button';
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst/fieldset';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/catalyst/dropdown';
import { createDeal } from '@/lib/api';  // API function to create a deal
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/catalyst/checkbox';

const initialDealData: Omit<Deal, 'id'> = {
    name: '',
    deal_type: 'PERCENTAGE',
    discount_value: 0,
    display_start_date: '',
    display_end_date: '',
    usage_start_date: '',
    usage_end_date: '',
    max_nights_of_deal: 0,
    min_nights: 0,
    applicable_days: [true, true, true, true, true, true, true],  // Default to all days available
};

const CreateDealPage = ({ params }: { params: { slug: string } }) => {
    const [formData, setFormData] = useState<Omit<Deal, 'id'>>(initialDealData);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [dealType, setDealType] = useState('PERCENTAGE');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (index: number) => {
        const updatedDays = formData.applicable_days.map((day, i) => i === index ? !day : day);
        setFormData({ ...formData, applicable_days: updatedDays });
    };

    const handleDealTypeChange = (type: string) => {
        setDealType(type);
        setFormData({ ...formData, deal_type: type });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);  // Clear previous errors
        try {
            await createDeal(params.slug, formData);
            router.push(`/villas/${params.slug}/deals`);
        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Fieldset>
                <Legend>Create New Deal</Legend>
                <FieldGroup>
                    <Field>
                        <Label>Name</Label>
                        <Input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {error?.name && <Text className="text-red-500">{error.name[0]}</Text>}
                    </Field>
                    <Field>
                        <Dropdown>
                            <DropdownButton outline>
                                {dealType}
                            </DropdownButton>
                            <DropdownMenu>
                                <DropdownItem onClick={() => handleDealTypeChange('PERCENTAGE')}>Percentage</DropdownItem>
                                <DropdownItem onClick={() => handleDealTypeChange('FLAT')}>Fixed Amount</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Field>
                    <Field>
                        <Label>Discount Value ({dealType === 'PERCENTAGE' ? '%' : 'AED'})</Label>
                        <Input
                            name="discount_value"
                            type="number"
                            value={formData.discount_value}
                            onChange={handleChange}
                        />
                        {error?.discount_value && <Text className="text-red-500">{error.discount_value}</Text>}
                    </Field>
                    <Field>
                        <Label>Display Start Date</Label>
                        <Input
                            name="display_start_date"
                            type="date"
                            value={formData.display_start_date}
                            onChange={handleChange}
                        />
                        {error?.display_start_date && <Text className="text-red-500">{error.display_start_date[0]}</Text>}
                    </Field>
                    <Field>
                        <Label>Display End Date</Label>
                        <Input
                            name="display_end_date"
                            type="date"
                            value={formData.display_end_date}
                            onChange={handleChange}
                        />
                        {error?.display_end_date && <Text className="text-red-500">{error.display_end_date[0]}</Text>}
                    </Field>
                    <Field>
                        <Label>Usage Start Date</Label>
                        <Input
                            name="usage_start_date"
                            type="date"
                            value={formData.usage_start_date}
                            onChange={handleChange}
                        />
                        {error?.usage_start_date && <Text className="text-red-500">{error.usage_start_date[0]}</Text>}
                    </Field>
                    <Field>
                        <Label>Usage End Date</Label>
                        <Input
                            name="usage_end_date"
                            type="date"
                            value={formData.usage_end_date}
                            onChange={handleChange}
                        />
                        {error?.usage_end_date && <Text className="text-red-500">{error.usage_end_date[0]}</Text>}
                    </Field>
                    <Field>
                        <Label>Max Nights of Deal</Label>
                        <Input
                            name="max_nights_of_deal"
                            type="number"
                            value={formData.max_nights_of_deal}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <Label>Min Nights</Label>
                        <Input
                            name="min_nights"
                            type="number"
                            value={formData.min_nights}
                            onChange={handleChange}
                        />
                    </Field>
                    <Fieldset>
                        <Legend>Applicable Days</Legend>
                        <Text>Days when the deal is active</Text>
                        <CheckboxGroup>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                                <CheckboxField key={index}>
                                    <Checkbox
                                        className='hover:cursor-pointer'
                                        name={`day_${index}`}
                                        checked={formData.applicable_days[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <Label>{day}</Label>
                                </CheckboxField>
                            ))}
                        </CheckboxGroup>
                    </Fieldset>
                </FieldGroup>
                <Button className="mt-8 hover:cursor-pointer" type="submit">Create Deal</Button>
                {error && typeof error === 'string' && <Text className="text-red-500 mt-4">{error}</Text>}
                {error && error?.non_field_errors && <Text className="text-red-500 mt-4">{error}</Text>}
            </Fieldset>
        </form>
    );
};

export default CreateDealPage;
