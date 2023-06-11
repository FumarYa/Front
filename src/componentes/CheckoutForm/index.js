import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51NHm4TJC0zmv5aqNvQkXydrUrUoP4W68Sz3RgfBCaTogse2dRUgdTQBhazFq4ScLjnxgxaSf0FGmFrDEcSO1WI4f00ed3E3p9w");

export const CheckoutForm = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment('{YOUR_CLIENT_SECRET}', {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    return (
        <Elements stripe={stripePromise}>
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement id="card-element" onChange={handleChange} />
                <button disabled={processing || disabled || succeeded} id="submit">
                    <span id="button-text">{processing ? "Processing…" : "Pay now"}</span>
                </button>
                {error && <div className="card-error" role="alert">{error}</div>}
            </form>
        </Elements>
    );
};