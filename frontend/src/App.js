import axios from 'axios';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Marquee from 'react-marquee-slider';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import VisionAcuityTest from './screens/VisionAcuityTest ';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentChoiceScreen from './screens/PaymentChoiceScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import SearchScreen from './screens/SearchScreen';
import DashboardScreen from './screens/DashboardScreen';
import AllProducts from './screens/AllProducts';
import EditProductScreen from './screens/EditProductScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ForgotPass from './screens/ForgotPass';
import ResetPass from './screens/ResetPass';
import AboutUsScreen from './screens/AboutUsScreen';
import SearchBar from './Components/SearchBar';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminRoute from './Components/AdminRoute';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Stores';
import { getError } from './utils';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
    toast.success('You have been logged out.');
  };

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
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar expand="lg" className="head-navbar">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand className="text-white brand-name">
                <img src="/logo.png" alt="logo"></img>Sight2See
              </Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle
              className="nav-toggler"
              aria-controls="basic-navbar-nav"
              style={{ borderColor: '#f0c040' }}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              &nbsp; &nbsp; &nbsp;
              <SearchBar />
              &nbsp; &nbsp; &nbsp;
              <Nav className="me-auto justify-content-start">
                <Link className="head1 nav-link text-white rounded" to="/">
                  Home
                </Link>
                <Link
                  className="head1 nav-link text-white rounded"
                  to="/search"
                >
                  Products
                </Link>
                <Link
                  className="head1 nav-link text-white rounded"
                  to="/test"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Eye Test
                </Link>
                <Link
                  className="head1 nav-link  text-white rounded"
                  to="/about"
                >
                  About
                </Link>
              </Nav>
              <Nav className="me-auto  w-100  justify-content-end">
                <Link to="/cart" className=" head1 nav-link text-white rounded">
                  <span className="text-white">Cart</span>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>

                {userInfo ? (
                  <NavDropdown
                    title={userInfo.name}
                    id="basic-nav-dropdown"
                    className="head2-1 rounded-left"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link head2 rounded" to="/signin">
                    <span className="text-white">Sign In</span>
                  </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown
                    title="Admin"
                    id="admin-nav-dropdown"
                    className="head2-2 rounded-right"
                  >
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="marquee-container text-white">
          <Marquee velocity={80}>
            {[
              <span key="1" className="marquee-text">
                50% off your first purchase - you could be entitled !!!
              </span>,
            ]}
          </Marquee>
        </div>
      </header>

      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/about" element={<AboutUsScreen />} />
            <Route path="/test" element={<VisionAcuityTest />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<RegisterScreen />} />
            <Route path="/forget-password" element={<ForgotPass />} />
            <Route path="/reset-password/:token" element={<ResetPass />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/shipping" element={<ShippingScreen />}></Route>
            <Route path="/payment" element={<PaymentChoiceScreen />}></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchScreen />} />

            <Route
              /* Admin */
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AllProducts />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/product/:id"
              element={
                <AdminRoute>
                  <EditProductScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/user/:id"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            ></Route>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <footer className="footer mt-5 p-5">
        <div className="text-center">@Copyrght - Sight2Seee</div>
      </footer>
    </BrowserRouter>
  );
}
export default App;
