import React, { useEffect, useState } from 'react';
import UserTable from 'react-bootstrap/Table';
import './user-table.css';
import axios from '../../../utils/axios';

function SellerBuyerInformation() {
    const [sellerPurchases, setSellerPurchases] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const itemsPerPage = 5; // Set items per page

    useEffect(() => {
        const fetchSellerPurchases = async () => {
            try {
                const response = await axios.get('/api/seller/purchases'); // Adjust the endpoint as per your backend
                setSellerPurchases(response.data.$values || []); // Use empty array if $values is undefined
            } catch (err) {
                setError('Failed to fetch seller purchases. Please try again later.');
                console.error(err); // Log the error for debugging
            } finally {
                setLoading(false);
            }
        };

        fetchSellerPurchases();
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(sellerPurchases.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sellerPurchases.slice(indexOfFirstItem, indexOfLastItem); // Slice the sellerPurchases array

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div>
                <h2 className='mb-5'>Seller Buyer Information</h2>
            </div>
            <UserTable striped bordered hover responsive className="align-middle">
                <thead>
                    <tr>
                        <th>Buyer Username</th>
                        <th>Item Title</th>
                        <th>Final Price (USD)</th>
                        <th>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((purchase) => (
                            <tr key={purchase.purchaseID}>
                                <td>{purchase.buyerUsername}</td>
                                <td>{purchase.itemTitle}</td>
                                <td>{purchase.finalPrice}</td>
                                <td>{new Date(purchase.purchaseDate).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No purchases found.</td>
                        </tr>
                    )}
                </tbody>
            </UserTable>
            {/* Pagination controls */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sellerPurchases.length)} of {sellerPurchases.length} entries
                </div>
                <div className='prev-next-container'>
                    <button className='previous-button' variant="secondary" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <span className="current-page mx-3">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button className='next-button' variant="secondary" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SellerBuyerInformation;
