import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const quantities = useSelector((state) => state.quantities);

  const handleQuantityChange = (productId, quantity) => {
    dispatch({
      type: 'PRICE',
      payload: {
        productId,
        quantity,
      },
    });
  };

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="card-columns mt-5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`card mt-5 ${quantities[product.id] > 0 ? 'selected' : ''}`}
              >
                <h1 className="card-title text-center m-3 mb-4">{product.title}</h1>
                <div className="card-image-container" style={{ position: 'relative' }}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="card-img-top"
                    style={{ width: '100%', height: 'auto', maxWidth: '200px' }}
                  />
                  <div className="price-quantity-container" style={{ position: 'absolute', top: '0', right: '0', padding: '8px', background: 'rgba(255, 255, 255, 0.8)' }}>
                    <p><strong>${product.price}</strong></p>
                    <label><strong></strong></label>
                    <select
                      className="card-quantity"
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                      value={quantities[product.id] || 0}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">{product.description}</p>
                  <p><strong>Rating: </strong>{product.rating}</p>
                  <p><strong>Discount: </strong>{product.discountPercentage}%</p>
                  <p><strong>Category: </strong>{product.category}</p>
                  <p><strong>Stock: </strong>{product.stock}</p>
                  <div className={`mt-3 ${quantities[product.id] === undefined ? 'd-none' : ''}`}>
                    <div className="container">
                      <div>
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3><strong>SUBTOTAL :</strong></h3>
                            <h3 className="text-end">$ {product.price * quantities[product.id]}</h3>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 ><strong>SHIPPING :</strong></h3>
                            <h3 className="text-end"><strong>FREE</strong></h3>
                          </div>
                          <div className="d-flex justify-content-between">
                            <h3><strong>TOTAL :</strong></h3>
                            <h3 className="text-end">$ {product.price * quantities[product.id]}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
