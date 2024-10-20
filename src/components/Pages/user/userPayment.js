import React, { useEffect, useState } from 'react';
import './user-payment.css';
import axios from '../../../utils/axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Q4il8LqGu1kpAE7tc1Mr932T1rBgOb1ZdjpWMwpaK9elFIYiAwqZa40MdhfGeDzu1UkpplxGk5KgBWDgGQm5IIL00aFedfPVk');

function UserPayment() {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientSecret, setClientSecret] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false); // State for success notification
    const itemsPerPage = 5;

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('/api/Payment/user/payments');
            const paymentsData = response.data.$values;
            setPayments(paymentsData);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const handlePayClick = async (payment) => {
        setSelectedPayment(payment);
        try {
            const response = await axios.post('/api/Payment/create-intent', {
                auctionID: payment.auctionID,
                paymentAmount: payment.paymentAmount
            });
            console.log('Payment Intent Response:', response.data); // Log the entire response
            setClientSecret(response.data.clientSecret);
            setSessionId(response.data.sessionId); // This might be undefined
            console.log(response.data.sessionId)
            console.log(response.data.clientSecret)
            setShowPaymentModal(true);
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    const handlePaymentSuccess = async () => {
        try {
            await axios.post('/api/Payment/order-success', {
                paymentID: selectedPayment.paymentID,
                auctionID: selectedPayment.auctionID,
                paymentAmount: selectedPayment.paymentAmount,
                sessionId: sessionId
            });
            setShowSuccessNotification(true); // Show success notification
            fetchPayments(); // Refetch payments to update the list
            setShowPaymentModal(false);
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    const sortedPayments = payments.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));
    const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedPayments.slice(indexOfFirstItem, indexOfLastItem);

    const pendingPaymentsCount = payments.filter(payment => payment.paymentStatus === 0).length;

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="user-payment-container mt-4">
            <h2 className="user-payment-title">User Payments</h2>

            {showSuccessNotification && (
                <div className="alert alert-success" role="alert">
                    Payment was successful!
                </div>
            )}

            <p className="warning">
                You have <strong> {pendingPaymentsCount} </strong> pending payment(s).
            </p>

            <table className="user-payment-table table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Payment ID</th>
                        <th>Auction ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((payment) => (
                        <tr key={payment.paymentID}>
                            <td>{payment.paymentID}</td>
                            <td>{payment.auctionID}</td>
                            <td>${payment.paymentAmount.toFixed(2)}</td>
                            <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                            <td>
                                <span className={`user-payment-status ${
                                    payment.paymentStatus === 0 ? 'pending' :
                                    payment.paymentStatus === 1 ? 'completed' :
                                    payment.paymentStatus === 2 ? 'failed' :
                                    payment.paymentStatus === 3 ? 'refunded' :
                                    'cancelled'}`}>
                                    {payment.paymentStatus === 0 ? 'Pending' :
                                     payment.paymentStatus === 1 ? 'Completed' :
                                     payment.paymentStatus === 2 ? 'Failed' :
                                     payment.paymentStatus === 3 ? 'Refunded' :
                                     'Cancelled'}
                                </span>
                            </td>
                            <td>
                                {payment.paymentStatus === 0 ? (
                                    <button 
                                        className="user-payment-btn btn btn-primary" 
                                        onClick={() => handlePayClick(payment)}
                                    >
                                        Pay
                                    </button>
                                ) : (
                                    <span></span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, payments.length)} of {payments.length} entries
                </div>
                <div className='prev-next-container'>
                    <button className='previous-button' onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <span className="current-page mx-3">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button className='next-button' onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>

            {showPaymentModal && (
                <div className="payment-modal">
                    <div className="payment-modal-content">
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <PaymentForm 
                                onSuccess={handlePaymentSuccess} 
                                auctionID={selectedPayment.auctionID} 
                                paymentAmount={selectedPayment.paymentAmount} 
                                onClose={() => setShowPaymentModal(false)} // Pass the onClose function
                            />
                        </Elements>
                    </div>
                </div>
            )}
        </div>
    );
}

function PaymentForm({ onSuccess, auctionID, paymentAmount, onClose }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin
            },
            redirect: "if_required"
        });

        if (result.error) {
            console.error(result.error.message);
        } else {
            onSuccess();
        }
    };

    return (
        <div className="payment-form-container mt-5">
            <div className="payment-form-card shadow">
                <div className="payment-form-body">
                    <form onSubmit={handleSubmit}>
                        <h4 className="payment-form-title">Payment Information</h4>
                        <p className="payment-form-text"><strong>Payment Amount:</strong> ${paymentAmount.toFixed(2)}</p>
                        
                        <button 
                            type="button" 
                            className="btn btn-danger payment-form-close float-right mb-3" 
                            onClick={onClose}
                        >
                            &times; {/* Close icon */}
                        </button>
                        
                        <PaymentElement className="payment-form-element mb-4" />
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary payment-form-submit" 
                            disabled={!stripe}
                        >
                            Pay
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserPayment;
