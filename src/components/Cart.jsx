import { ListGroup, Button, Row, Col, Image, Form } from 'react-bootstrap';
import { CartState } from '../context/Context';
import { useEffect, useState } from 'react';
import Ratings from './Ratings';
import { AiFillAccountBook, AiFillDelete } from 'react-icons/ai';

export default function Cart() {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  });

  return (
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
          {cart.map((prod) => (
            <>
              <ListGroup.Item key={prod.id}>
                <Row>
                  <Col md={2}>
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col md={2}>
                    <span>₹ {prod.price}</span>
                  </Col>
                  <Col md={2}>
                    <Ratings rating={prod.ratings} />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={prod.qty}
                      onChange={(e) =>
                        dispatch({
                          type: 'CHANGE_CART_QTY',
                          payload: {
                            id: prod.id,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {[...Array(prod.inStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() =>
                        dispatch({
                          type: 'REMOVE TO CART',
                          payload: prod,
                        })
                      }
                    >
                      <AiFillDelete fontSize='20px' />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </>
          ))}
        </ListGroup>
      </div>
      <div className='filters summary'>
        <span className='title'>Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button type='button' disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
