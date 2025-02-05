import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import "../stripe.css"
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-store";
import {toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

export default function CheckoutForm() {
  const token = useEcomStore((state) => state.token)
  const clearCart = useEcomStore((state) => state.clearCart)

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload  = await stripe.confirmPayment({
      elements,
    //   confirmParams: {
    //     // Make sure to change this to your payment completion page
    //     return_url: "http://localhost:3000/complete",
    //   },
    redirect: 'if_required'
    });

    console.log('payload',payload);
    if (payload.error) {
      setMessage(payload.error.message);
      console.log('error');
      toast.error(payload.error.message)
    } 
    else if(payload.paymentIntent.status ==="succeeded"){
      console.log('Ready or Saveorder');
      //create error
      saveOrder(token,payload)
      .then((res)=>{
        console.log(res);
        clearCart()
        toast.success('Payment Success!!!')
        navigate('/user/history')
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    else {
      console.log('Something wrong!!!');
      toast.warning('ชำระเงินไม่สำเร็จ')
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion"
  }
  return (
    <div className="min-h-screen flex-col flex items-start pt-20 bg-gray-50">
      <form 
        className="space-y-6 bg-white p-10 rounded-xl shadow-lg w-[600px]"  // ✅ ขยายขนาดฟอร์ม
        id="payment-form" 
        onSubmit={handleSubmit}
      >
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        
        <button 
          className="stripe-button w-full"
          disabled={isLoading || !stripe || !elements} 
          id="submit"
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
  
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}