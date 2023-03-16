import React, { useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import { Store } from '../Stores';
import { getError } from '../utils';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <h1 className="mb-5">Dashboard</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card
                className="border border-white"
                style={{ backgroundColor: '#e1c300' }}
              >
                <Card.Body>
                  <Card.Title style={{ color: 'white' }}>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Card.Title>
                  <Card.Text> Users</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card
                className="border border-white"
                style={{ backgroundColor: '#e1c300' }}
              >
                <Card.Body>
                  <Card.Title style={{ color: 'white' }}>
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].numOrders
                      : 0}
                  </Card.Title>
                  <Card.Text> Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card
                className="border border-white"
                style={{ backgroundColor: '#e1c300' }}
              >
                <Card.Body>
                  <Card.Title style={{ color: 'white' }}>
                    $
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0}
                  </Card.Title>
                  <Card.Text> Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3 mt-5 text-center">
            <h2>Daily Sales</h2>
            {summary.dailyOrders.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Date', 'Sales'],
                  ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3 text-center">
            <h2>Brand of Products</h2>
            {summary.productBrand.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Brand', 'Products'],
                  ...summary.productBrand.map((x) => [x._id, x.count]),
                ]}
                options={{
                  colors: [
                    '#e1c300', // yellow
                    '#e1a300', // dark yellow
                    '#e16f00', // orange
                    '#e13a00', // red orange
                    '#b21e00', // red
                    '#8e0d00', // dark red
                    '#7b004f', // magenta
                    '#4a006e', // purple
                    '#0060a2', // blue
                    '#008c9e', // teal
                    '#00bfa5', // green-blue
                    '#00a888', // green
                    '#8bc34a', // lime green
                    '#cddc39', // lime
                    '#ffeb3b', // yellow-green
                  ],
                }}
              ></Chart>
            )}
          </div>
          <div className="my-3 text-center">
            <h2>Product Categories</h2>
            {summary.productCategory.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="BarChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategory.map((x) => [x._id, x.count]),
                ]}
                options={{
                  colors: ['#e1c300'],
                }}
              ></Chart>
            )}
          </div>
        </>
      )}
    </div>
  );
}
