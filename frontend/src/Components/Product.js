import React from 'react'
import Rating from './Rating';

export default function Product(props) {
    const {product} = props;
  return (
    <div key={product.id} className="card">
    <a href={`/product/${product._id}`}>{/* this is telling the link for the product of that specific product id */}
        <img className="medium" src={product.image} alt={product.name}/>{/* image size must be: 680px by 830px */}
    </a>
    <div className="card-body">
        <a href={`/product/${product._id}`}>{/* this is telling the link for the product of that specific product id */}
            <h2>{product.name}</h2>
            <h3>{product.brand}</h3>
        </a>
        <Rating rating={product.rating} numRatings={product.numRatings}></Rating>
        <div className="price">
            ${product.price}
        </div>
    </div>
</div>
  )
}
