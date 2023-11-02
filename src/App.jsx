// App.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const quantities = useSelector((state) => state.quantities);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuantityChange = (productId, quantity) => {
    dispatch({
      type: 'PRICE',
      payload: {
        productId,
        quantity,
      },
    });
    setSelectedProduct(productId);
  };

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="card-columns mt-5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`card mt-5 ${selectedProduct === product.id ? 'selected' : ''}`}
              >
                <h1 className="card-title text-center m-3 mb-4">{product.title}</h1>
                <img src={product.thumbnail} alt={product.title} className="card-img-top mx-auto mb-4" style={{ width: '250px' }} height='200px'/>
                <div className="card-body">
                  <p className="card-text">{product.description}</p>
                  <p><strong>Rating: </strong>{product.rating}</p>
                  <p><strong>Discount: </strong>{product.discountPercentage}%</p>
                  <p><strong>Category: </strong>{product.category}</p>
                  <p><strong>Stock: </strong>{product.stock}</p>
                  <h4 className="card-price">${product.price}</h4>
                  <label><strong>Quantity: </strong></label>&nbsp;&nbsp;&nbsp;
                  <select
                    className="card-quantity"
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  >
                    <option value="0">Select Quantity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  {selectedProduct === product.id && (
                    <div>
                      <p><strong>SUBTOTAL:</strong> $ {product.price * (quantities[product.id] || 1)}</p>
                      <p><strong>SHIPPING:</strong> FREE</p>
                      <p><strong>TOTAL:</strong> $ {product.price * (quantities[product.id] || 1)}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
