import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Example form inputs
  const [customerAddress, setCustomerAddress] = useState('Customer Address');
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [totalAmount, setTotalAmount] = useState('1000');

  const handleCreateOrder = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const API_KEY = 'd384448367c5e0fa5870efb72070677a1ee014b5';
      const CLIENT_NAME = 'SF TENACIOUS 0078090';

      const url = 'https://one.delhivery.com/api/cmu/create.json';

      const payload = {
        pickup_location: {
          name: 'Client Warehouse',
          address: 'Warehouse Address',
          phone: '1234567890',
          pin: '110001',
          country: 'India',
        },
        shipments: [
          {
            add: customerAddress,
            phone: customerPhone,
            pin: '110001',
            order: 'Order' + Date.now(),
            products_desc: 'Product Description',
            payment_mode: 'Prepaid',
            total_amount: totalAmount,
            cod_amount: '0',
            seller_gst_tin: 'GSTIN1234567890',
            hsn_code: '6101',
            invoice_reference: 'INV' + Date.now(),
          },
        ],
        client: CLIENT_NAME,
      };

      // Axios call with added timeout of 10 seconds
      const response = await axios.post(
        url,
        payload,
        {
          headers: {
            Authorization: `Token ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 seconds timeout
        }
      );

      if (response.data && response.data.pk) {
        setOrderId(response.data.pk);
      } else {
        setErrorMessage('Order creation failed. Please check the details.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setErrorMessage('An error occurred while creating the order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Create Delhivery Order</h1>
      {/* Optional: Input fields for dynamic data */}
      {/* <input
        type="text"
        placeholder="Customer Address"
        value={customerAddress}
        onChange={(e) => setCustomerAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Customer Phone"
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
      />
      <input
        type="number"
        placeholder="Total Amount"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
      /> */}
      <button onClick={handleCreateOrder} disabled={loading}>
        {loading ? 'Creating Order...' : 'Create Order'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {orderId && (
        <div>
          <h2>Order Created Successfully!</h2>
          <p>Order ID: {orderId}</p>
        </div>
      )}
    </div>
  );
}

export default App;
