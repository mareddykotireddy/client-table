import React, { useState, useEffect } from 'react';
import { Table, Tag, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment';

const Sku = () => {
  const [skus, setSkus] = useState([]);
  const [clientId, setClientId] = useState(localStorage.getItem('selectedClient'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const baseUrl = `http://216.230.74.17:8013/api/Sku?clientId=${clientId}`;
    setIsLoading(true);

    axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setSkus(res?.data?.data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setError('Error fetching SKU data');
      });
  }, [clientId]);

  const handleClientIdChange = (value) => {
    setClientId(value);
    localStorage.setItem('selectedClient', value);
  };

  const columns = [
    {
      title: 'sku1',
      dataIndex: 'sku1',
      key: '2',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: '3',
    },
    {
      title: 'purchasecost',
      dataIndex: 'purchasecost',
      key: '4',
    },
    {
      title: 'itemtype',
      dataIndex: 'itemtype',
      key: '5',
      render: (_, { itemtype }) => {
        let color = 'green'; // Set color to green
        let tags = itemtype ? itemtype.toUpperCase() : ''; // Convert itemtype to uppercase or set an empty string if it's null
        return (
          <Tag color={color} key={tags}>
            {tags}
          </Tag>
        );
      },
    },

    {
      title: 'status',
      dataIndex: 'status',
      key: '6',
      render: (_, { status }) => {
        let color = 'green'; 
        let tags = status ? status.toUpperCase() : '';
        return (
          <Tag color={color} key={tags}>
            {tags}
          </Tag>
        );
      },
    },

    {
      title: 'entrydate',
      dataIndex: 'entrydate',
      key: '7',
      render: (text) => moment(text).format('MM/DD/YYYY'),
    },
  ];

  return (
    <div>
      <input type="text" value={clientId} onChange={(e) => handleClientIdChange(e.target.value)} />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table dataSource={skus} columns={columns} />
      )}
      {error && <div>{error}</div>}
    </div>
  );
}

export default Sku;
