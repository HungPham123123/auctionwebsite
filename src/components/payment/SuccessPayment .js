// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// const SuccessPayment = () => {
//     const [paymentStatus, setPaymentStatus] = useState(null);
//     const [error, setError] = useState(null);
    
//     const { paymentID } = useParams();  // Extract paymentID from URL

//     useEffect(() => {
//         const confirmPayment = async () => {
//             if (!paymentID) {
//                 setError('Payment ID is missing');
//                 return;
//             }

//             try {
//                 const response = await axios.get(`/api/payments/confirm/${paymentID}`);
//                 if (response.data.success) {
//                     setPaymentStatus('Payment has been confirmed and updated.');
//                 } else {
//                     setError('Payment confirmation failed.');
//                 }
//             } catch (err) {
//                 setError('An error occurred while confirming the payment.');
//             }
//         };

//         confirmPayment();
//     }, [paymentID]);

//     return (
//         <div className="container mt-5">
//             {error ? (
//                 <div className="alert alert-danger text-center" role="alert">
//                     <h4 className="alert-heading">Payment Error!</h4>
//                     <p>{error}</p>
//                 </div>
//             ) : (
//                 <div className="alert alert-success text-center" role="alert">
//                     <h4 className="alert-heading">Payment Successful!</h4>
//                     <p>{paymentStatus || 'Your payment is being processed.'}</p>
//                     <hr />
//                     <p className="mb-0">Thank you for your purchase!</p>
//                 </div>
//             )}
//             <Link to="/user/payment" className="btn btn-primary mt-3">Return to Payments</Link>
//         </div>
//     );
// };

// export default SuccessPayment;
