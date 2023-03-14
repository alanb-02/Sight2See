import React from 'react';
import data from './data';
import Product from './Components/Product';


function App() {
  return (
    <div className="grid-container">
            <header className="row">
                <div>
                    <a className="brandName" href="index.html">Sight2See</a>
                </div>
                <div>
                    <a href="cart.html">Cart</a>
                    <a href="signIn.html">Sigh In</a>
                </div>
            </header>

            <main>
                <div className="row center">
                    {data.products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                    ))}
                </div>
            </main>
            
            <footer className="row center">
                By Alan Byju
            </footer>
        </div>
  );
}

export default App;
