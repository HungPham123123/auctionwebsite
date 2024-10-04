import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Table, Pagination } from 'react-bootstrap'; // Import Bootstrap Table and Pagination

function AdminAuctionHistory() {
    const [auctionHistories, setAuctionHistories] = useState([]); // State to store auction histories
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage] = useState(10); // Number of items per page

    useEffect(() => {
        // Fetch auction histories from the API
        axios.get('/api/Admin/auctionhistories')
            .then(response => {
                console.log(response.data);
                setAuctionHistories(response.data.$values); // Set auction histories in state from $values
                setLoading(false); // Stop loading
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Error fetching auction histories'); // Handle error
                setLoading(false); // Stop loading
            });
    }, []); // Empty dependency array means this will run once when component mounts

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = auctionHistories.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(auctionHistories.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div>Loading auction histories...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Auction History</h1>
            {auctionHistories.length > 0 ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Auction History ID</th>
                                <th>Auction ID</th>
                                <th>Bid ID</th>
                                <th>Bid Amount</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(history => (
                                <tr key={history.auctionHistoryID}>
                                    <td>{history.auctionHistoryID}</td>
                                    <td>{history.auctionID}</td>
                                    <td>{history.bidID}</td>
                                    <td>{history.bidAmount}</td>
                                    <td>{new Date(history.timestamp).toLocaleString() || 'N/A'}</td> {/* Format timestamp */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1} 
                        />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item 
                                key={index + 1} 
                                active={index + 1 === currentPage} 
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages} 
                        />
                    </Pagination>
                </>
            ) : (
                <p>No auction histories found.</p>
            )}
        </div>
    );
}

export default AdminAuctionHistory;
