import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheakOut from './CheakOut';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)
// const stripePromise = loadStripe('pk_test_51PLV75AjWpOP8HLuqEItKKUi4lr32GHjsG0CozrdQ9XfnL1SIn5w1mlZBvHu7d0F638Bc57gvwqFJNRpxqTad3Rl00E6HJwqMT')
// console.log(stripePromise);
const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheakOut></CheakOut>
            </Elements>
        </div>
    );
};

export default Payment;