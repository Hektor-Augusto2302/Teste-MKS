import './ShoppingCart.scss';
import { motion } from 'framer-motion';
import closed from '../../../../public/closed.svg';
import Image from 'next/image';
import { useCart } from '@/app/context/CartProvider';

interface ShoppingCartProps {
    toggleCart: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ toggleCart }) => {
    const { cart, totalAmount } = useCart();

    const slideInAnimation = {
        initial: { x: '100%' },
        animate: { x: '0%' },
        exit: { x: '100%' },
        transition: { type: 'spring', stiffness: 150 },
    };

    return (
        <motion.aside
            className="shopping-cart"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideInAnimation}
        >
            <div className='cart'>
                <h2>Carrinho de Compras</h2>
                <Image
                    className='img-closed'
                    src={closed}
                    alt="Ícone de fechar"
                    width={38}
                    height={38}
                    onClick={toggleCart}
                />
            </div>
            <div className="cart-items" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {cart.slice(0, 5).map((item) => (
                    <>
                        <div key={item.productId} className="card">
                            <div className='card-top'>
                                <img src={item.photo} alt={item.name} width={56} height={57} />
                            </div>
                            <span className='card-name'>{item.name}</span>
                            <span className='button-span'>
                                <button>-</button>
                                <span>{item.quantity}</span>
                                <button>+</button>
                            </span>
                            <span className="price">R${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="close-icon">
                            <Image src={closed} alt="Ícone de fechar" width={18} height={25} />
                        </div>
                    </>
                ))}
            </div>
            <div className="total-wrapper">
                <h3>Total:</h3>
                <h3>R${totalAmount.toFixed(2)}</h3>
            </div>
            <button className='button-finish'>Finalizar Compra</button>
        </motion.aside>
    );
};

export default ShoppingCart;