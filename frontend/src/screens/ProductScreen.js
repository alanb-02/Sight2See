import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import React, { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Badge,
  Tab,
  Nav,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Stores';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { euclideanDistance } from 'face-api.js';
import * as faceapi from 'face-api.js';
const { loadFaceLandmarkTinyModel } = faceapi;

const tinyFaceDetectorModelUrl =
  '/images/tiny_face_detector_model-weights_manifest.json';
const faceLandmark68TinyNetModelUrl =
  '/images/face_landmark_68_tiny_model-weights_manifest.json';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  function ModelViewer({ modelUrl }) {
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);

    useEffect(() => {
      if (!canvasRef.current) {
        return;
      }

      const canvas = canvasRef.current;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);

      rendererRef.current = renderer;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.width / canvas.height,
        0.1,
        1000
      );
      camera.position.z = 2;

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      // Add OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 1;
      controls.maxDistance = 10;
      controls.maxPolarAngle = Math.PI / 2;
      controlsRef.current = controls;

      const animate = () => {
        requestAnimationFrame(animate);
        controlsRef.current.update(); // Update the controls in the animation loop
        rendererRef.current.render(scene, camera);
      };

      const loadModel = async () => {
        const loader = new GLTFLoader();
        try {
          const gltf = await loader.loadAsync(modelUrl);
          scene.add(gltf.scene);
          animate();
        } catch (error) {
          console.error('Error loading 3D model:', error);
        }
      };

      loadModel();

      return () => {
        // Clean up controls when unmounting the component
        controlsRef.current.dispose();
      };
    }, [modelUrl]);

    return (
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '500px',
        }}
      />
    );
  }

  const [videoEnabled, setVideoEnabled] = useState(false);

  const toggleVideoFeed = () => {
    setVideoEnabled(!videoEnabled);
  };

  function getBoundingBoxDimensions(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    return size;
  }

  function VideoFeed({ modelUrl }) {
    const videoRef = useRef(null);
    const canvas2DRef = useRef(null);
    const canvas3DRef = useRef(null);
    const rendererRef = useRef(null);

    useEffect(() => {
      const loadModels = async () => {
        await faceapi.loadTinyFaceDetectorModel(tinyFaceDetectorModelUrl);
        await loadFaceLandmarkTinyModel(faceLandmark68TinyNetModelUrl);
      };

      loadModels();
    }, []);

    const loadModel = async (modelPath) => {
      return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
          modelPath,
          (gltf) => {
            gltf.scene.traverse((child) => {
              if (child.isMesh) {
                const newMaterial = new THREE.MeshStandardMaterial({
                  map: child.material.map,
                  color: child.material.color,
                  roughness: child.material.roughness,
                  metalness: child.material.metalness,
                  transparent: child.material.transparent,
                  opacity: child.material.opacity,
                });

                child.material = newMaterial;
              }
            });
            resolve(gltf.scene);
          },
          undefined,
          (error) => {
            reject(error);
          }
        );
      });
    };

    function getBoundingBoxDimensions(object) {
      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      box.getSize(size);
      return size;
    }

    function calculateFaceRotation(landmarks) {
      const leftEye = landmarks.getLeftEye()[0];
      const rightEye = landmarks.getRightEye()[0];
      const deltaY = rightEye.y - leftEye.y;
      const deltaX = rightEye.x - leftEye.x;
      const angle = Math.atan2(deltaY, deltaX);

      return angle;
    }

    useEffect(() => {
      if (!videoRef.current || !canvas2DRef.current || !canvas3DRef.current) {
        return;
      }

      const video = videoRef.current;
      const canvas2D = canvas2DRef.current;
      const canvas3D = canvas3DRef.current;

      const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          canvas2D.width = video.videoWidth;
          canvas2D.height = video.videoHeight;
          canvas3D.width = video.videoWidth;
          canvas3D.height = video.videoHeight;

          camera.aspect = canvas3D.width / canvas3D.height;
          camera.updateProjectionMatrix();

          rendererRef.current.setSize(canvas3D.width, canvas3D.height);
        };
        await video.play();
      };

      startVideo();

      const context2D = canvas2D.getContext('2d');

      const scene = new THREE.Scene();
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = 0.2;

      rendererRef.current = new THREE.WebGLRenderer({
        canvas: canvas3D,
        alpha: true,
      });

      loadModel(modelUrl)
        .then((gltfModel) => {
          gltfModel.name = 'loadedModel';
          const modelDimensions = getBoundingBoxDimensions(gltfModel);
          gltfModel.userData.dimensions = modelDimensions;
          scene.add(gltfModel);
        })
        .catch((error) => {
          console.error('Error loading 3D model:', error);
        });

      const animate = async () => {
        requestAnimationFrame(animate);

        const detections = await faceapi
          .detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 96,
              scoreThreshold: 0.5,
            })
          )
          .withFaceLandmarks(true);

        context2D.clearRect(0, 0, canvas2D.width, canvas2D.height);

        // Flip video horizontally
        context2D.save();
        context2D.scale(-1, 1);
        context2D.drawImage(
          video,
          -canvas2D.width,
          0,
          canvas2D.width,
          canvas2D.height
        );
        context2D.restore();

        if (detections && detections.length > 0) {
          const landmarks = detections[0].landmarks;
          const noseBridgeTop = landmarks.getNose()[0];

          const targetSize = 1.0;
          const model = scene.getObjectByName('loadedModel');

          if (model) {
            const dimensions = model.userData.dimensions;
            const scaleFactor =
              targetSize / Math.max(dimensions.x, dimensions.y, dimensions.z);

            model.scale.set(scaleFactor, scaleFactor, scaleFactor);
            model.position.set(
              -((noseBridgeTop._x / canvas3D.width) * 2 - 1),
              -((noseBridgeTop._y / canvas3D.height) * 2 - 1),
              -1 - scaleFactor / 1.5
            );

            // Rotate model based on face rotation
            const faceRotation = calculateFaceRotation(landmarks);
            model.rotation.y = THREE.MathUtils.lerp(
              model.rotation.y,
              faceRotation,
              0.1
            );
          }
        }

        rendererRef.current.render(scene, camera);
      };

      animate();
    }, [videoRef, canvas2DRef, canvas3DRef, product.modelUrl]);

    return (
      <>
        <video ref={videoRef} style={{ display: 'none' }} />
        <canvas ref={canvas2DRef} style={{ position: 'absolute' }} />
        <canvas ref={canvas3DRef} style={{ position: 'absolute' }} />
      </>
    );
  }

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Helmet>
            <title>Sight2See - {product.name}</title>
          </Helmet>
          <div className="product-screen-wrapper">
            <Container>
              <Row className="my-4">
                <Col md={6}>
                  <Tab.Container defaultActiveKey="image">
                    <Nav variant="pills" className="mb-3 nav-pills-custom">
                      <Nav.Item>
                        <Nav.Link className="bg-white" eventKey="image">
                          Image
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="bg-white" eventKey="model">
                          Model Viewer
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="bg-white" eventKey="tryon">
                          Virtual Try-On
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content>
                      <Tab.Pane eventKey="image">
                        <Image src={product.image} alt={product.name} fluid />
                      </Tab.Pane>
                      <Tab.Pane eventKey="model">
                        <ModelViewer modelUrl={product.threeD} />
                        <p className="text-success">
                          *** Drag with mouse to move model, and scroll/pinch to
                          zoom in and out
                        </p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="tryon">
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '0',
                            paddingBottom: '75%',
                          }}
                        >
                          <VideoFeed modelUrl={product.threeD} />
                          <p className="text-success">
                            *** Place head closer to screen until the glasses
                            appear on the face
                          </p>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Col>
                <Col className="mt-5" md={6}>
                  <Card>
                    <Card.Header className="" as="h5">
                      {product.name}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{product.description}</Card.Text>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col>Brand:</Col>
                            <Col>{product.brand}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Price:</Col>
                            <Col>${product.price.toFixed(2)}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Status:</Col>
                            <Col>
                              {product.countInStock > 0 ? (
                                <Badge pill bg="success">
                                  In Stock
                                </Badge>
                              ) : (
                                <Badge pill bg="danger">
                                  Out of Stock
                                </Badge>
                              )}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Button
                            onClick={addToCartHandler}
                            className="submit1-btn btn-success btn-block w-100"
                            type="button"
                            disabled={product.countInStock === 0}
                          >
                            Add to Cart
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </div>
  );
}
export default ProductScreen;
