import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VisionAcuityTest = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [resultRightEye, setResultRightEye] = useState(null);
  const [resultLeftEye, setResultLeftEye] = useState(null);
  const [isTestVisible, setIsTestVisible] = useState(false);
  const [isLeftEyeTest, setIsLeftEyeTest] = useState(false);

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

  const navigate = useNavigate();

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

  const restartTest = () => {
    setCurrentLevel(1);
    setUserInput('');
    setResultRightEye(null);
    setResultLeftEye(null);
    setIsLeftEyeTest(false);
  };

  const bookingHandler = () => {
    navigate('/signin?redirect=/booking');
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center mt-4">Vision Acuity Test</h1>
          <p className="text-center mt-5">
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
            <span className="text-danger">
              <b>!!!</b> - However, it is important to note that these tests
              should not replace comprehensive eye exams conducted by qualified
              eye care professionals, as they are unable to detect underlying
              eye conditions or provide accurate prescriptions for corrective
              lenses.
            </span>
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <Button
            id="button-search"
            className="btn-warning"
            onClick={() => setIsTestVisible(!isTestVisible)}
            aria-controls="test-content"
            aria-expanded={isTestVisible}
          >
            {isTestVisible ? 'Hide Test' : 'Start Test'}
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
      <Row>
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
          <Button
            id="button-search"
            onClick={bookingHandler}
            className="btn-warning"
          >
            Make a Booking
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default VisionAcuityTest;
