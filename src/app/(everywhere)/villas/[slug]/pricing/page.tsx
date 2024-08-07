'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosConfig';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst/fieldset';
import { Text } from '@/components/catalyst/text';
import { Input } from '@/components/catalyst/input';
import { AxiosError } from 'axios';
import { Button } from '@/components/catalyst/button';
import { patchPricing } from '@/lib/api';
import { Alert, AlertActions, AlertDescription, AlertTitle } from '@/components/catalyst/alert';

function VillaPriceForm({ params }: { params: { slug: string } }) {
    const [prices, setPrices] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axiosInstance.get(`/villas/${params.slug}/base-price/`);
                setPrices(response.data[0]?.prices.map((price: string) => parseFloat(price)) || []);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setError(err.response?.data?.message || err.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, [params]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSuccess(false);
        setError(null);

        if (prices.length !== 7) {
            setError('Please enter all 7 prices.');
            setAlertOpen(true);
            return;
        }

        try {
            await patchPricing(params.slug, prices);
            setSuccess(true);
            setAlertOpen(true);
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || err.message);
            } else {
                setError("An unexpected error occurred.");
            }
            setAlertOpen(true);
        }
    };

    const handleChange = (index: number, value: string) => {
        const updatedPrices = [...prices];
        updatedPrices[index] = parseFloat(value);
        setPrices(updatedPrices);
    };

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Fieldset>
                    <Legend>Base Prices for the Week</Legend>
                    <Text>Enter the base prices for each day of the week.</Text>
                    <FieldGroup>
                        {daysOfWeek.map((day, index) => (
                            <Field key={index}>
                                <Label>{day}</Label>
                                <Input
                                    name={`price_${day.toLowerCase()}`}
                                    type="number"
                                    step="0.01"
                                    value={prices[index] || ''}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                />
                            </Field>
                        ))}
                    </FieldGroup>
                </Fieldset>
                <Button className="mt-8" type="submit">Submit</Button>
            </form>

            <Alert open={alertOpen} onClose={setAlertOpen}>
                <AlertTitle>{success ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>
                    {success ? "Prices updated successfully!" : error}
                </AlertDescription>
                <AlertActions>
                    <Button plain onClick={() => setAlertOpen(false)}>
                        Close
                    </Button>
                </AlertActions>
            </Alert>
        </>
    );
}

export default VillaPriceForm;
