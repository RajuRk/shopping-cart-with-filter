import { CartState } from '../context/Context';
import SingleProduct from './SingleProduct';
import Filters from './Filters';
import './style.css';

export default function Home() {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  // console.log(products);

  const trasnformProducts = () => {
    let sortProducts = products;

    if (sort) {
      sortProducts = sortProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortProducts = sortProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortProducts = sortProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortProducts = sortProducts.filter((prod) => prod.ratings >= byRating);
    }

    if (searchQuery) {
      sortProducts = sortProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortProducts;
  };

  return (
    <div className='home'>
      <Filters />
      <div className='productContainer'>
        {trasnformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
}
