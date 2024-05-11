"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductsResponse } from '../interfaces/interface-props';

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

if (!apiEndpoint) {
    throw new Error('NEXT_PUBLIC_API_ENDPOINT não está definido');
}

export const useFetchProducts = () => {
    const [data, setData] = useState<ProductsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<ProductsResponse>(apiEndpoint);
                setData(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { data, loading, error };
};
