import { Button, Card } from 'react-bootstrap';
import Ratings from './Ratings';
import { CartState } from '../context/Context';

export default function SingleProduct({ prod }) {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className='products'>
      <Card>
        <Card.Img variant='top' src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {prod.price.split('.')[0]}</span>
            {prod.fastDelivery ? (
              <div>Fast delivery</div>
            ) : (
              <div>4 day delivery</div>
            )}
            <Ratings rating={prod.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: 'REMOVE TO CART',
                  payload: prod,
                });
              }}
              variant='danger'
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({
                  type: 'ADD TO CART',
                  payload: prod,
                });
              }}
              disabled={!prod.inStock}
            >
              {!prod.inStock ? 'Out of stock' : 'Add to cart'}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
