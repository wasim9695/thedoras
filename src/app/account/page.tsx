'use client';

import React, { useEffect, useState } from "react";

const AccountPage = () => {
  const [accountInfo, setAccountInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        // const fetchAccountData = async () => {
        //     try {
        //         const response = await fetch('/api/account');
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         const data = await response.json();
        //         setAccountInfo(data);
        //         setOrders(data.orders || []);
        //         setAddresses(data.addresses || []);
        //     } catch (error) {
        //         setError('Failed to fetch account data');
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchAccountData();
    }, []);


return (
    <h1>hello</h1>
)

};

export default AccountPage;