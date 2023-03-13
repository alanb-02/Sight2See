import React from 'react';
import data from './data';


function App() {
  return (
    <div class="grid-container">
            <header class="row">
                <div>
                    <a class="brandName" href="index.html">Sight2See</a>
                </div>
                <div>
                    <a href="cart.html">Cart</a>
                    <a href="signIn.html">Sigh In</a>
                </div>
            </header>

            <main>
                <div class="row center">
                    {
                        data.products.map(product => (
                            <div key={product.id} class="card">
                                <a href={`/product/${product._id}`}>{/* this is telling the link for the product of that specific product id */}
                                    <img class="medium" src={product.image} alt={product.name}/>{/* image size must be: 680px by 830px */}
                                </a>
                                <div class="card-body">
                                    <a href={`/product/${product._id}`}>{/* this is telling the link for the product of that specific product id */}
                                        <h2>{product.name}</h2>
                                        <h3>{product.brand}</h3>
                                    </a>
                                    <div class="rating">
                                        <span><i class="fa fa-star"></i></span>
                                        <span><i class="fa fa-star"></i></span>
                                        <span><i class="fa fa-star"></i></span>
                                        <span><i class="fa fa-star"></i></span>
                                        <span><i class="fa fa-star"></i></span>
                                    </div>
                                    <div class="price">
                                        ${product.price}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </main>
            
            <footer class="row center">
                By Alan Byju
            </footer>
        </div>
  );
}

export default App;
