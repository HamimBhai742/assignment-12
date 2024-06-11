import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheakOut from './CheakOut';
import { loadStripe } from '@stripe/stripe-js';
import { Helmet } from 'react-helmet';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)
const Payment = () => {
    return (
        <div>
             <Helmet>
                <title>Payment</title>
            </Helmet>
            <Elements stripe={stripePromise}>
                <CheakOut></CheakOut>
            </Elements>
        </div>
    );
};

export default Payment;