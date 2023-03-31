import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { Helmet } from 'react-helmet-async';

const AboutUsScreen = () => {
  return (
    <div className="about">
      <Helmet>
        <title>Sight2See - About Us</title>
      </Helmet>
      <Container>
        <h1 className="text-center mt-5">About Us</h1>
        <Row className="my-5">
          <Col md={6} className="align-self-center">
            <Fade left>
              <h3 className="mb-4">Who We Are?</h3>
              <p className="text-muted mb-4">
                Sight2See Optician Company is a leading provider of eye care
                services and products in Ireland. We have been serving our local
                community for years and are committed to providing high-quality
                care at affordable prices.
              </p>
              <p className="text-muted mb-4">
                Our team of experienced optometrists and opticians are dedicated
                to helping you see clearly and feel great in your eyewear. We
                offer a wide selection of eyeglasses, sunglasses, and contact
                lenses from top brands in the industry, as well as comprehensive
                eye exams and fittings.
              </p>
              <p className="text-muted mb-4">
                We pride ourselves on our exceptional customer service and
                personalized attention to each and every customer. Whether you
                need a new prescription, a new pair of glasses, or advice on eye
                care, our team is here to help.
              </p>
            </Fade>
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <Fade right>
              <img
                src="/images/about1.png"
                alt="Optician"
                className="ab-img img-fluid"
              />
            </Fade>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={6} className="d-flex align-items-center">
            <Fade left>
              <img
                src="/images/about2.png"
                alt="PRSI Benefits"
                className="ab-img img-fluid"
              />
            </Fade>
          </Col>
          <Col md={6} className="align-items-center">
            <Fade right>
              <h3 className="mb-4">PRSI Benefits</h3>
              <p className="text-muted mb-4">
                If you are an employee in Ireland and pay PRSI (Pay-Related
                Social Insurance) you may be entitled to a free eye test every
                two years. The PRSI scheme also offers a contribution towards
                the cost of glasses or contact lenses if you need them for work.
              </p>
              <p className="text-muted mb-4">
                At Sight2See Optician Company, we are registered with the PRSI
                scheme and can provide eligible customers with their
                entitlements. If you are unsure if you are eligible, please
                contact us and we will be happy to assist you.
              </p>
            </Fade>
          </Col>
        </Row>

        <hr className="my-5" />

        <Row className="my-5">
          <Col>
            <Fade bottom>
              <h2 className="text-center mb-5">Contact Us</h2>
            </Fade>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={6}>
            <Fade left>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.0415793037243!2d-6.25805534812606!3d53.35062097997856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670cc684b0778f%3A0x8295e5a5f5c5c5b0!2sSight2See%20Optician%20Company!5e0!3m2!1sen!2sus!4v1647732352716!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="our locations"
              ></iframe>
            </Fade>
          </Col>
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <Fade right>
              <div className="d-flex align-items-center mb-4">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-warning icon"
                />
                <div>
                  <p className="text-muted mb-0">Address</p>
                  <p className="mb-0">123 Main Street</p>
                  <p className="mb-0">Dublin 2, Ireland</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <FontAwesomeIcon icon={faPhone} className="text-warning icon" />
                <div>
                  <p className="text-muted mb-0">Phone</p>
                  <p className="mb-0">+353-123-4567</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-warning icon"
                />
                <div>
                  <p className="text-muted mb-0">Email</p>
                  <p className="mb-0">sight2alan@gmail.com</p>
                </div>
              </div>
            </Fade>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUsScreen;
