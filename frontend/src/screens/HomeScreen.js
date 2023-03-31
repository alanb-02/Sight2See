import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  const banImg = '/images/caroussel1.jpg';

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  const image1 = '/images/h1.jpg';
  const image2 = '/images/h2.jpg';
  const image3 = '/images/h3.jpg';
  const image4 = '/images/h4.jpg';

  return (
    <div>
      <Helmet>
        <title>Sight2See - Home</title>
      </Helmet>
      <Container
        fluid
        className="banner"
        style={{ backgroundImage: `url(${banImg})` }} // Use url() function here
      >
        <Row className="align-items-center text-center">
          <Col>
            <h1 className="display-4">
              Welcome to{' '}
              <span style={{ color: '#f0c040' }}>
                <u>Sight2See</u>
              </span>
              !
            </h1>
            <p className="lead">Explore Where Your Eyes Can Take You</p>
          </Col>
        </Row>
      </Container>
      <Container className="my-4 mt-5">
        <h3 className="mb-4 text-center">What we Offer</h3>
        <Row>
          <Col sm={3} className="fade-in-image mb-4">
            <div className="image-container">
              <img
                src={image1}
                alt="perspective"
                className="img-fluid rounded-circle home-image"
              />
              <Link to={'/about'}>
                <p className="image-caption">
                  New perspective <FaArrowRight />
                </p>
              </Link>
            </div>
          </Col>
          <Col sm={3} className="fade-in-image fade-in-image-delay-1 mb-4">
            <div className="image-container">
              <img
                src={image2}
                alt="products"
                className="img-fluid rounded-circle home-image"
              />
              <Link to={'/search'}>
                <p className="image-caption">
                  Vast Frame Selection <FaArrowRight />
                </p>
              </Link>
            </div>
          </Col>
          <Col sm={3} className="fade-in-image fade-in-image-delay-2 mb-4">
            <div className="image-container">
              <img
                src={image3}
                alt="virtual try-on"
                className="img-fluid rounded-circle home-image"
              />
              <p className="image-caption">Hassle free - Virtually Try-On</p>
            </div>
          </Col>
          <Col sm={3} className="fade-in-image fade-in-image-delay-3 mb-4">
            <div className="image-container">
              <img
                src={image4}
                alt="online tests"
                className="img-fluid rounded-circle home-image"
              />
              <Link to={'/test'}>
                <p className="image-caption">
                  Eye health matters <FaArrowRight />
                </p>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default HomeScreen;
