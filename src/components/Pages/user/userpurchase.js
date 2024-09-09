import React, { useState } from 'react';
import UserTable from 'react-bootstrap/Table';
import  './user-table.css';
function Userpurchase() {


    const purchaseitem = [
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/book-1.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 6622.8955,
            highestBid: 6652.8955,
            status: false,
        },
        {
            image: "images/book-3.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9022.8955,
            status: true,
        },
        {
            image: "./images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9512.8955,
            status: false,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/book-1.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 6622.8955,
            highestBid: 6652.8955,
            status: false,
        },
        {
            image: "images/book-3.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9022.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9512.8955,
            status: false,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/book-1.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 6622.8955,
            highestBid: 6652.8955,
            status: false,
        },
        {
            image: "images/book-3.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9022.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9512.8955,
            status: false,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/book-1.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 6622.8955,
            highestBid: 6652.8955,
            status: false,
        },
        {
            image: "images/book-3.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9022.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9512.8955,
            status: false,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/book-1.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 6622.8955,
            highestBid: 6652.8955,
            status: false,
        },
        {
            image: "images/book-3.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9022.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9512.8955,
            status: false,
        }, {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 1222.8955,
            highestBid: 1222.8955,
            status: true,
        },
        {
            image: "images/book-1.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 6622.8955,
            highestBid: 6652.8955,
            status: false,
        },
        {
            image: "images/book-3.jpg",
            biddingId: "Bidding_HvO253gT",
            bidAmount: 9022.8955,
            highestBid: 9022.8955,
            status: true,
        },
        {
            image: "images/productimage9.jpg",
            biddingId: "hiuhi",
            bidAmount: 9022.8955,
            highestBid: 9512.8955,
            status: false,
        },

    ];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate pagination details
    const totalPages = Math.ceil(purchaseitem.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = purchaseitem.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <div>
            <div>
                <h2 className='mb-5'>Purchased</h2>
            </div>
            <UserTable striped bordered hover responsive className="align-middle">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Bidding ID</th>
                        <th>Bid Amount (USD)</th>
                        <th>Highest Bid</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={`${item.biddingId}-${index}`}>
                            <td>
                                <img src={item.image} alt="Auction Item" width="50" height="50" />
                            </td>
                            <td>{item.biddingId}</td>
                            <td>{item.bidAmount.toFixed(2)}</td>
                            <td>${item.highestBid.toFixed(2)}</td>
                            <td style={{ color: item.status ? 'green' : 'red' }}>
                                {item.status ? 'Approved' : 'Rejected'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </UserTable>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, purchaseitem.length)} of {purchaseitem.length} entries
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
    )
}

export default Userpurchase;