import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useContest from '../../../hooks/useContest';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const CheakOut = () => {
    const { id } = useParams()
    const stripe = useStripe()
    const elements = useElements()
    const [contest, refetch] = useContest()
    const axiosPublic = useAxiosPublic()
    const [clientSecret, setClientSecret] = useState('')
    const { user } = useAuth()
    const findPayment = contest.find(pay => pay._id === id)
    const findAmount = parseInt(findPayment?.contestPrice)
    // console.log(findAmount);

    useEffect(() => {
        if (findAmount > 0) {
            axiosPublic.post('/create-payment-intent', { price: findAmount })
                .then(res => {
                    console.log(res.data);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosPublic, findAmount])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.message}`,
            });
        }
        else {
            console.log('[PaymentMethod]', paymentMethod);

        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user.displayName,
                    email: user.email
                }

            }

        })

        if (confirmError) {
            console.log('errrrrr', confirmError);
        }
        else {
            console.log('pay success', paymentIntent);
            console.log(paymentIntent.id);
            let count = findPayment?.participantsCount || 0
            if (paymentIntent.status === "succeeded") {
                const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                const currentDate = new Date().toISOString().slice(0, 10).split('-').reverse().join('-')
                const currentDateAndTime = currentDate + " " + currentTime
                const paymentHis = {
                    email: user?.email,
                    price: findAmount,
                    date: currentDateAndTime,
                    transactionId: paymentIntent.id,
                    contestId: id,
                    status: 'Complete',
                    isRegister: true
                }
                const res = await axiosPublic.post('/payment', paymentHis)
                console.log(res.data);
                count++
                console.log(count);
                const result = await axiosPublic.patch(`/contest/${id}`, { count })
                console.log(result.data);
                refetch()
                const submitContest = {
                    contestId: id,
                    title: findPayment?.contestName,
                    prize: findPayment?.prizeMoney,
                    perticipantUser: user?.displayName,
                    perticipantUserEmail: user?.email,
                    perticipateImg: user?.photoURL,
                    submitedTask: findPayment?.taskDetails
                }
                console.log(submitContest);
                const submitRes = await axiosPublic.post(`/submited-contest`, submitContest)
                console.log(submitRes.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your payment have been successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='mt-28'>
                <div className='px-12'>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '20px',
                                    color: '#424770',
                                    fontFamily: 'inter',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <div className='flex justify-center'>
                    <button className='bg-[#570DF8] my-7  text-white w-48 rounded-lg py-2 font-inter text-xl font-bold' type="submit">
                        Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheakOut;