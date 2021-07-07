import logo from './logo.svg';
import './App.css';
import products from "./data.json";
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Card, Button, Modal, Image,ListGroup, Row, Container, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart, setCart] = useState({})
  const [show, setShow] = useState(false)
  const [showSaved, setShowShaved] = useState(false)
  const [saved, setSaved] = useState({})

  let total = 0;


  const getIndexFromId = (id) => {
    const index = products.findIndex(p => p.id == id);
    return index
  }
  const changeQuantityInCart = (id, quantity) => {

    setCart((prev) => {
      let local = { ...prev };
      local[id] = quantity;
      if (quantity == undefined) {
        delete local[id];
      }
      return local;
    })
    removedFromSaved(id)
  }

  const removedFromSaved = (id) => {
    setSaved((prev) => {
      let local = { ...prev };
      local[id] = false;
      return local;
    })
  }


  const toggleSaved = (id) => {
    setSaved((prev) => {
      let local = { ...prev };
      local[id] = local[id] ? undefined : true
      return local;
    })
    setCart((prev) => {
      let local = { ...prev };
      local[id] = undefined;
      return local;
    })
  }

  const handleSavedClose = () => setShowShaved(false);
  const handleSavedShow = () => setShowShaved(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <div className="py-5 px-auto" >
        <Button onClick={handleShow}>Check Cart </Button>
        <Button onClick={handleSavedShow}>Saved</Button>
      </div>
      <Container>
        <Row>
          {products.map((product) => {
            return (<Col xs={3} className="my-3">
              <ProductCard quantity={cart[product.id]} toggleSaved={toggleSaved} saved={saved[product.id]} changeQuantityInCart={changeQuantityInCart} product={product} />
            </Col>)
          })}
        </Row>

        <Modal fullscreen={true} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">You have the following items in cart</p>
          <Row>

          <Col xs={12} md={8} >
            <Row>
              {Object.keys(cart).map((id) => {
                return (<Col xs={3} className="my-3">
                    <ProductCard showRemove toggleSaved={toggleSaved} saved={saved[id]} quantity={cart[id]} changeQuantityInCart={changeQuantityInCart} product={products[getIndexFromId(id)]} />
                  </Col>) 
                  
              })}
            </Row>
            </Col>
            
            <Col xs={12} md={4}>
            <ListGroup variant="flush">

              
              {Object.keys(cart).map((id)=>{
                
                total = total + products[getIndexFromId(id)].price * cart[id]
                return   <ListGroup.Item className="d-flex justify-content-between "  variant="secondary"><div className="text-truncate"><span class="badge bg-primary">{cart[id]}</span><small className="text-truncate text-wrap text-break">{products[getIndexFromId(id)].title}</small></div> <b className="text-primary">{products[getIndexFromId(id)].price}</b>  </ListGroup.Item>
                
              })}
              <ListGroup.Item className="d-flex justify-content-between text-truncate "  variant="success"><b className="text-truncate">Total</b> <b className="text-primary">{total}</b>  </ListGroup.Item>
                
              </ListGroup>
            </Col>
          </Row>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="primary" onClick={handleClose}>
              CheckOut
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal fullscreen={true} show={showSaved} onHide={handleSavedClose}>
          <Modal.Header closeButton>
            <Modal.Title>Saved Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">You have wishlisted the items</p>

            <Row>
              {Object.keys(saved).map((id) => {
                return saved[id] ?
                  (<Col xs={3} className="my-3">
                    <ProductCard showInSaved quantity={cart[id]} toggleSaved={toggleSaved} saved={saved[id]} changeQuantityInCart={changeQuantityInCart} product={products[getIndexFromId(id)]} />
                  </Col>) :
                  null
              })}
            </Row>

          </Modal.Body>
          <Modal.Footer>

            <Button variant="primary" onClick={handleClose}>
              CheckOut
            </Button>
          </Modal.Footer>
        </Modal>


      </Container>
    </div>
  );
}

export default App;
