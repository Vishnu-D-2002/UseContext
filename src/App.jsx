import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const quantities = useSelector((state) => state.quantities);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedQuantities, setSelectedQuantities] = useState({});

  const handleQuantityChange = (productId, quantity) => {
    dispatch({
      type: 'PRICE',
      payload: {
        productId,
        quantity,
      },
    });
    setSelectedProduct(productId);

    // Update the selectedQuantities state
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
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
                  <h4 className="card-price"><strong>Price : </strong>${product.price}</h4>
                  <label><strong>Quantity: </strong></label>&nbsp;&nbsp;&nbsp;
                  <select
                    className="card-quantity"
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    value={selectedQuantities[product.id] || 0}
                  >
                    <option value="0">Select Quantity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  {selectedQuantities[product.id] !== undefined && (
                    <div className='mt-3'>
                      <div className="row">
                        <div className="col-6">
                          <h3><strong>SUBTOTAL :</strong></h3>
                          <h2 className='mt-3'><strong>SHIPPING :</strong></h2>
                          <h1><strong>TOTAL :</strong></h1>
                        </div>
                        <div className="col-6 text-end">
                          <p><h3>$ {product.price * selectedQuantities[product.id]}</h3></p>
                          <h2><strong>FREE</strong></h2>
                          <p><h1>$ {product.price * selectedQuantities[product.id]}</h1></p>
                        </div>
                      </div>
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