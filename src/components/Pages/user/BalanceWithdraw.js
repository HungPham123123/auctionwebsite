import React from 'react';

const BalanceWithdraw = () => {
  // Inline styles as JavaScript objects
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
    width: '600px', // Tăng chiều ngang của balanceBox
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
    marginTop: '-60px', // Di chuyển nút lên trên một chút
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <h2>Your Balance</h2>

      {/* Current Balance Section */}
      <div style={balanceSectionStyle}>
        <div style={balanceBoxStyle}>
          <div style={balanceTextStyle}>
            <p style={{ fontWeight: 'bold' }}>Current balance</p>
            <p style={{ fontSize: '12px', marginTop: '5px' }}>Payout account</p>
          </div>
          <div style={balanceAmountWrapperStyle}>
            <div style={balanceAmountStyle}>
              200$
            </div>
            <span className="bidder-count" style={unsuccessfulPaymentStyle}>Unsuccessful payment  </span>
          </div>
        </div>
        <button className="btn btn-dark" style={buttonStyle}>Make payment</button>
      </div>

      {/* Transactions Table */}
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
          <tr>
            <th scope="row">1</th>
            <td>10-29-2021</td>
            <td>Pending......</td>
            <td></td>
            <td>200$</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>10-29-2021</td>
            <td>Successfully</td>
            <td></td>
            <td>200$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BalanceWithdraw;