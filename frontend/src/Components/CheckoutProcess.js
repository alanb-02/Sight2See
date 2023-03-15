import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CheckoutProcess(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>
        <strong>Sign-In</strong>
      </Col>
      <Col className={props.step2 ? 'active' : ''}>
        <strong>Shipping</strong>
      </Col>
      <Col className={props.step3 ? 'active' : ''}>
        <strong>Place Order</strong>
      </Col>
    </Row>
  );
}
