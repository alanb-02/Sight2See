import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../Components/Rating';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import Button from 'react-bootstrap/Button';
import Product from '../Components/Product';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: '$50 to 100',
    value: '50-100',
  },
  {
    name: '$101 to $200',
    value: '101-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
  {
    name: '$1001 to $5000',
    value: '1001-5000',
  },
];

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <div style={{ backgroundColor: '#748678', padding: '20px' }}>
            <h3 style={{ color: '#193821', marginBottom: '10px' }}>
              Department
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li>
                <Link
                  className={'all' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                  style={{ textDecoration: 'none', color: '#d4ba10' }}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? 'text-bold' : ''}
                    to={getFilterUrl({ category: c })}
                    style={{ textDecoration: 'none', color: '#d4ba10' }}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ backgroundColor: '#748678', padding: '20px' }}>
            <h3 style={{ color: '#193821', marginBottom: '10px' }}>Price</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li>
                <Link
                  className={'all' === price ? 'text-bold' : ''}
                  to={getFilterUrl({ price: 'all' })}
                  style={{ textDecoration: 'none', color: '#d4ba10' }}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? 'text-bold' : ''}
                    style={{ textDecoration: 'none', color: '#d4ba10' }}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ backgroundColor: '#748678', padding: '20px' }}>
            <h3 style={{ color: '#193821', marginBottom: '10px' }}>
              Avg. Customer Review
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    style={{
                      color: `${r.rating}` === `${rating}` ? '#193821' : '#000',
                    }}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={getFilterUrl({ rating: 'all' })}
                  style={{ color: rating === 'all' ? '#193821' : '#000' }}
                >
                  <Rating caption={' & up'} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    <strong>
                      {countProducts === 0 ? 'No' : countProducts}
                    </strong>
                    &nbsp; Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price ' + price}
                    {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    rating !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                    className="sort"
                  >
                    <option className="sort-drop" value="newest">
                      Newest Arrivals
                    </option>
                    <option className="sort-drop" value="lowest">
                      Price: Low to High
                    </option>
                    <option className="sort-drop" value="highest">
                      Price: High to Low
                    </option>
                    <option className="sort-drop" value="toprated">
                      Avg. Customer Reviews
                    </option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: '/search',
                      search: getFilterUrl({ page: x + 1 }),
                    }}
                    style={
                      x + 1 === Number(page)
                        ? { backgroundColor: '#e1c300', color: 'white' }
                        : {}
                    }
                  >
                    <Button
                      className={
                        Number(page) === x + 1
                          ? 'btn btn-warning text-bold text-white rounded-circle border border-warning'
                          : 'btn border-0'
                      }
                      variant="white"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
