import React, { useState } from 'react';
import './payment.css';

function Payment() {
    const [amount, setAmount] = useState(599.00); // Set your auction amount here
    const [paymentData, setPaymentData] = useState({
        auctionId: 1, // Replace with your auction ID
        userId: 1, // Replace with the logged-in user ID
        paymentAmount: amount,
        paymentStatus: 1 // Assuming 1 means pending
    });

    const handlePayment = async () => {
        try {
            const response = await fetch('/api/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect the user to the Stripe checkout session
                window.location.href = data.url;
            } else {
                console.error('Error creating payment session:', data);
                alert('Payment session could not be created.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('An error occurred while processing the payment.');
        }
    };

    return (
        <div>
            <div className="container payment-container">
                <div className="row">
                    <div className="col-md-7">
                        <div className="card box1 shadow-sm p-md-5 p-4">
                            <div className="fw-bolder mb-4">
                                <span className="fas fa-dollar-sign" />
                                <span className="ps-1">{amount.toFixed(2)}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center justify-content-between text">
                                    <span>Total</span>
                                    <span className="fas fa-dollar-sign">
                                        <span className="ps-1">{amount.toFixed(2)}</span>
                                    </span>
                                </div>
                                <div className="border-bottom mb-4" />
                                <div className="d-flex align-items-center justify-content-between text mt-5">
                                    <div className="btn btn-primary w-100" onClick={handlePayment}>Pay ${amount.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                    <form action="">
  
  <div className="row">
    
    <div className="col-12">
      
      <div className="d-flex flex-column px-md-5 px-4 mb-4">
        
        <span>Credit Card</span>
        <div className="inputWithIcon">
          
          <input
            className="form-control"
            type="text"
            defaultValue="5136 1845 5468 3894"
          />
          <span className="">
            
          </span>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      
      <div className="d-flex flex-column ps-md-5 px-md-0 px-4 mb-4">
        
        <span>
          Expiration<span className="ps-1">Date</span>
        </span>
        <div className="inputWithIcon">
          
          <input
            type="text"
            className="form-control"
            defaultValue="05/20"
          />
          <span className="fas fa-calendar-alt" />
        </div>
      </div>
    </div>
    <div className="col-md-6">
      
      <div className="d-flex flex-column pe-md-5 px-md-0 px-4 mb-4">
        
        <span>Code CVV</span>
        <div className="inputWithIcon">
          
          <input
            type="password"
            className="form-control"
            defaultValue={123}
          />
          <span className="fas fa-lock" />
        </div>
      </div>
    </div>
    <div className="col-12">
      
      <div className="d-flex flex-column px-md-5 px-4 mb-4">
        
        <span>Name</span>
        <div className="inputWithIcon">
          
          <input
            className="form-control text-uppercase"
            type="text"
            defaultValue="valdimir berezovkiy"
          />
          <span className="far fa-user" />
        </div>
      </div>
    </div>
    <div className="col-12 px-md-5 px-4 mt-3">
        
    </div>
  </div>
</form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
