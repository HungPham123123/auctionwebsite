import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

const BalanceWithdraw = () => {
  const [balance, setBalance] = useState(0); // State to store balance
  const containerStyle = {
    maxWidth: '900px',
    margin: 'auto',
    textAlign: 'center',
    marginTop: '50px',
  };

  const balanceSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '30px',
  };

  const balanceBoxStyle = {
    border: '1px solid #000',
    padding: '15px',
    width: '600px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const balanceTextStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const balanceAmountWrapperStyle = {
    textAlign: 'right',
  };

  const balanceAmountStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
  };

  const unsuccessfulPaymentStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    fontSize: '14px',
    marginTop: '5px',
    display: 'block',
  };

  const tableStyle = {
    marginTop: '30px',
    width: '100%',
  };

  const buttonStyle = {
    borderRadius: '0px',
    padding: '10px 25px',
    marginLeft: '10px',
    marginTop: '-60px',
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/current');
        setBalance(response.data.balannce || 0); // Set the balance from $values
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={containerStyle}>
      <h2>Your Balance</h2>

      <div style={balanceSectionStyle}>
        <div style={balanceBoxStyle}>
          <div style={balanceTextStyle}>
            <p style={{ fontWeight: 'bold' }}>Current balance</p>
            <p style={{ fontSize: '12px', marginTop: '5px' }}>Payout account</p>
          </div>
          <div style={balanceAmountWrapperStyle}>
            <div style={balanceAmountStyle}>
              {balance.toFixed(2)}$ {/* Display balance */}
            </div>
            <span className="bidder-count" style={unsuccessfulPaymentStyle}>Unsuccessful payment</span>
          </div>
        </div>
        <button className="btn btn-dark" style={buttonStyle}>Make payment</button>
      </div>

      <table className="table" style={tableStyle}>
        <thead>
          <tr>
            <th scope="col">Nr</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Text</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* Populate transaction rows here if necessary */}
        </tbody>
      </table>
    </div>
  );
};

export default BalanceWithdraw;
