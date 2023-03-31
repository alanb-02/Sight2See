import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const VisionAcuityTest = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [resultRightEye, setResultRightEye] = useState(null);
  const [resultLeftEye, setResultLeftEye] = useState(null);
  const [isTestVisible, setIsTestVisible] = useState(false);
  const [isLeftEyeTest, setIsLeftEyeTest] = useState(false);
  const [isAstigmatismTestVisible, setIsAstigmatismTestVisible] =
    useState(false);
  const [astigmatismResponse, setAstigmatismResponse] = useState(null);

  const chartLevelsRightEye = [
    'E',
    'FP',
    'TOZ',
    'LPED',
    'PECFD',
    'EDFCZP',
    'FELOPZD',
  ];

  const chartLevelsLeftEye = [
    'E',
    'LF',
    'ATH',
    'RONM',
    'GETCA',
    'ZPQXBH',
    'VDMKYW',
  ];

  const email = 'sight2alan@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast.success('Email has been copied to clipboard');
  };

  useEffect(() => {
    setUserInput('');
  }, [currentLevel]);

  const handleUserInput = (input) => {
    setUserInput(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const chartLevels = isLeftEyeTest
      ? chartLevelsLeftEye
      : chartLevelsRightEye;

    if (userInput.toUpperCase() === chartLevels[currentLevel - 1]) {
      if (currentLevel === chartLevels.length) {
        if (isLeftEyeTest) {
          const acuityLeft = 20 * currentLevel;
          setResultLeftEye(`Left eye vision acuity: 20/${acuityLeft}`);
        } else {
          const acuityRight = 20 * currentLevel;
          setResultRightEye(`Right eye vision acuity: 20/${acuityRight}`);
          setIsLeftEyeTest(true);
        }
        setCurrentLevel(1);
      } else {
        setCurrentLevel(currentLevel + 1);
      }
    } else {
      if (isLeftEyeTest) {
        const acuityLeft = 20 * currentLevel;
        setResultLeftEye(`Left eye vision acuity: 20/${acuityLeft}`);
      } else {
        const acuityRight = 20 * currentLevel;
        setResultRightEye(`Right eye vision acuity: 20/${acuityRight}`);
        setIsLeftEyeTest(true);
      }
      setCurrentLevel(1);
    }
  };

  const handleAstigmatismResponse = (e) => {
    setAstigmatismResponse(e.target.value);
  };

  const handleAstigmatismTest = () => {
    if (astigmatismResponse) {
      toast.info(
        'If you noticed significant differences in line appearance, consider consulting an eye care professional for a comprehensive eye examination.'
      );

      let result = 'It seems that you could have ';
      switch (astigmatismResponse) {
        case '1':
          result += 'mild astigmatism in your left eye.';
          break;
        case '2':
          result += 'mild astigmatism in your right eye.';
          break;
        case '3':
          result += 'moderate astigmatism in your left eye.';
          break;
        case '4':
          result += 'moderate astigmatism in your right eye.';
          break;
        case '5':
          result += 'severe astigmatism in your left eye.';
          break;
        case '6':
          result += 'severe astigmatism in your right eye.';
          break;
        case 'none':
          result += 'no significant signs of astigmatism.';
          break;
        default:
          result += 'an error occurred during the test.';
          break;
      }

      toast.info(result);
    } else {
      toast.error('Please choose an option before submitting.');
    }
  };

  const restartTest = () => {
    setCurrentLevel(1);
    setUserInput('');
    setResultRightEye(null);
    setResultLeftEye(null);
    setIsLeftEyeTest(false);
  };

  return (
    <Container>
      <Helmet>
        <title>Sight2See - Eye Test</title>
      </Helmet>
      <Row className="fade-in-left">
        <Col>
          <h1 className="text-center mt-4">Eye Tests</h1>
          <span className="text-danger text-center">
            <p>
              <b>!!!</b> - It is important to note that these tests should not
              replace comprehensive eye exams conducted by qualified eye care
              professionals, as they are unable to detect underlying eye
              conditions or provide accurate prescriptions for corrective
              lenses.
            </p>
          </span>
          <h3 className="text-center mt-5">Vision Acuity Test</h3>
          <p className="text-center mt-3">
            The online vision acuity test serves as a convenient and accessible
            tool designed to provide individuals with a preliminary assessment
            of their visual acuity, or sharpness of vision, from the comfort of
            their homes. These tests typically consist of a series of optotype
            charts, such as the Snellen or LogMAR charts, which measure the
            smallest characters a person can read at a standardized distance.
            The primary purpose of online vision acuity tests is to identify
            potential vision problems and encourage individuals to seek
            professional eye care if necessary.<br></br>
            <br></br>
          </p>
          <div className="d-flex justify-content-center mt-4 mb-4">
            <img
              src="/images/acuity-img.png"
              className="w-75"
              alt="astigmatism-example"
            ></img>
          </div>
        </Col>
      </Row>
      <Row className="fade-in-right">
        <Col className="text-center">
          <Button
            id="button-search"
            className="btn-warning"
            onClick={() => setIsTestVisible(!isTestVisible)}
            aria-controls="test-content"
            aria-expanded={isTestVisible}
          >
            {isTestVisible ? 'Hide Acuity Test' : 'Start Acuity Test'}
          </Button>
          <hr></hr>
          <Collapse in={isTestVisible}>
            <div id="test-content">
              {!resultLeftEye && (
                <div className="mt-4">
                  <h4>{isLeftEyeTest ? 'Left Eye Test' : 'Right Eye Test'}</h4>
                  <div
                    style={{
                      fontSize: `${24 / currentLevel}px`,
                      lineHeight: '1.5',
                    }}
                  >
                    {isLeftEyeTest
                      ? chartLevelsLeftEye[currentLevel - 1]
                      : chartLevelsRightEye[currentLevel - 1]}
                  </div>
                  <Form onSubmit={handleSubmit} className="mt-4">
                    <p>Please enter the letter you see.</p>
                    <Form.Control
                      type="text"
                      value={userInput}
                      onChange={(e) => handleUserInput(e.target.value)}
                      style={{ width: '15%', margin: '0 auto' }}
                    />
                    <Button
                      className="mt-2 submit1-btn btn-success"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                </div>
              )}
              {resultRightEye && (
                <div>
                  <h4>Results:</h4>
                  <p>{resultRightEye}</p>
                  <p>{resultLeftEye}</p>
                  <Button
                    className="mt-2 submit1-btn btn-success"
                    onClick={restartTest}
                  >
                    Restart Test
                  </Button>
                </div>
              )}
              <hr></hr>
            </div>
          </Collapse>
        </Col>
      </Row>

      <Row className="fade-in-left mt-4">
        <Col className="text-center">
          <h3>Astigmatism Test</h3>
          <p>
            Look at the Astigmatism Clock image below. Cover one eye and observe
            the lines on the image. If any lines appear darker or blurrier than
            the others, select the corresponding option. Repeat the process for
            the other eye.
          </p>
          <div className="d-flex justify-content-center mt-4 mb-4">
            <img
              src="/images/astigmatism-img.jpg"
              className="w-50"
              alt="astigmatism-example"
            ></img>
          </div>
          <Button
            id="button-search"
            className="btn-warning"
            onClick={() =>
              setIsAstigmatismTestVisible(!isAstigmatismTestVisible)
            }
            aria-controls="astigmatism-content"
            aria-expanded={isAstigmatismTestVisible}
          >
            {isAstigmatismTestVisible
              ? 'Hide Astigmatism Test'
              : 'Start Astigmatism Test'}
          </Button>
          <hr></hr>
          <Collapse in={isAstigmatismTestVisible}>
            <div id="astigmatism-content">
              <div className="mt-4">
                <img
                  className="ast-clock"
                  src="/images/astigmatism-clock.png"
                  alt="Astigmatism Clock"
                />
                <Form className="mt-4">
                  <Form.Group>
                    <Form.Label>
                      Choose the lines that appear darker or blurrier:
                    </Form.Label>
                    <Form.Control
                      as="select"
                      onChange={handleAstigmatismResponse}
                    >
                      <option value="">Select an option</option>
                      <option value="1">1 and 7</option>
                      <option value="2">2 and 8</option>
                      <option value="3">3 and 9</option>
                      <option value="4">4 and 10</option>
                      <option value="5">5 and 11</option>
                      <option value="6">6 and 12</option>
                      <option value="none">
                        No lines appear darker or blurrier
                      </option>
                    </Form.Control>
                  </Form.Group>
                  <Button
                    className="mt-2 submit1-btn btn-success"
                    onClick={handleAstigmatismTest}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
              <hr></hr>
            </div>
          </Collapse>
        </Col>
      </Row>

      <Row className="fade-in-right" id="booking-section">
        <Col className="text-center">
          <h1 className="text-center mt-4">Book an Appointment</h1>
          <p className="text-center mt-5">
            A clear view of the world can change our everyday experiences.
            Vision is a priceless gift. Your eye health and vision acuity are
            our top priorities at our optometry office. Our skilled team of
            experts is committed to offering individualized care and the most
            cutting-edge solutions to satisfy your particular requirements. Make
            a consultation session with us right away, and we'll help you see
            life in sharper detail.
          </p>
          <div className="mt-4">
            <h4>Contact us:</h4>
            <Button
              className="mt-2 email-button"
              onClick={copyEmail}
              style={{
                backgroundColor: 'transparent',
                borderColor: '#1f4f2b',
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer',
              }}
            >
              {email} | <i className="fas fa-copy text-warning"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VisionAcuityTest;
