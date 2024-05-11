"use client";

import './Products.scss';
import { useFetchProducts } from "@/app/hooks/useFetchProducts";
import buy from '../../../../public/buy.svg';
import Image from 'next/image';
import { useCart } from '@/app/context/CartProvider';

const ProductList: React.FC = () => {
    const { data, loading, error } = useFetchProducts();
    const { addToCart } = useCart();

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro ao carregar produtos: {error.message}</p>;
    }

    return (
        <div className="product-list">
            {data?.products.map((product) => (
                <div className="product-card" key={product.id}>
                    <img
                        className="product-image"
                        src={product.photo}
                        alt={product.name}
                        width={150}
                        height={150}
                    />

                    <div className="product-info">
                        <span className="product-name">{product.name}</span>
                        <span className="product-price">R${product.price}</span>
                    </div>

                    <div className="product-description">
                        <p>{product.description}</p>
                    </div>

                    <div className="product-actions">
                        <button
                            onClick={() =>
                                addToCart({
                                    productId: product.id,
                                    name: product.name,
                                    price: parseFloat(product.price),
                                    quantity: 1,
                                    photo: product.photo
                                })
                            }
                            className="buy">
                            <Image src={buy} alt="Ícone de compra" width={12} height={13} />
                            <span className='span-button'>Comprar</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
