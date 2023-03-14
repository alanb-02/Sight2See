import { Link } from 'react-router-dom';
import data from '../data';

function HomeScreen() {
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="row center">
        {data.products.map((product) => (
          <div className="card" key={product.slug}>
            {/* class=product */}
            <Link to={`/product/${product.slug}`}>
              <img className="medium" src={product.image} alt={product.name} />
            </Link>
            <div className="card-body">
              {/* class=product-info */}
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong className="price">${product.price}</strong>
              </p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
