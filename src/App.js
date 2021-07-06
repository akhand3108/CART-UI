import logo from './logo.svg';
import './App.css';
import products from "./data.json";
import { useState } from 'react';
import ProductCard from './ProductCard';
import {Card,Button,Modal, Image,Row,Container,Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart,setCart] = useState({})
  const [show,setShow] = useState(false)


  const getIndexFromId = (id)=>{
    const index =   products.findIndex(p=>p.id == id);
    return index
  }
  const changeQuantityInCart = (id,quantity)=>{
    setCart((prev)=>{
      let local = {...prev};
      local[id] = quantity;
      return local;
    })
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <div className="py-5 px-auto" >
        <Button onClick={handleShow}>Check Cart </Button>
      </div>
      <Container>
      <Row>
      {products.map((product)=>{
          return (<Col xs={3} className="my-3">
              <ProductCard quantity={cart[product.id]} changeQuantityInCart={changeQuantityInCart} product={product}/>
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
          {Object.keys(cart).map((id)=>{
          return cart[id]?
          (<Col xs={3} className="my-3">
              <ProductCard showRemove quantity={cart[id]} changeQuantityInCart={changeQuantityInCart} product={products[getIndexFromId(id)]}/>
          </Col>):
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
