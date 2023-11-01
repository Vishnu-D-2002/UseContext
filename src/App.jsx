import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./App.css"
function App() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const quantities = useSelector((state) => state.quantities);

  return (
    <div>
      {products.map((val) => (
        <div key={val.id} className='all'>
          <div className='insidebox'>
            <img src={val.thumbnail} alt={val.title} className='photo' />
            <div className='info'>
              <h2 className='title'>{val.title}</h2>
              <p>{val.description}</p>
            </div>
          </div>
          <div className='right'>
            <select
              className='selection'
              onChange={(e) => {
                dispatch({
                  type: 'PRICE',
                  payload: {
                    productId: val.id,
                    quantity: parseInt(e.target.value),
                  },
                });
              }}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>

            <h4 id='pi'>${val.price}</h4>
            <p className='remove'>Remove</p>
          </div>
          <hr />
          <p className='left'>SUBTOTAL:</p>
          <span className='rightside'>
            <h4>$ {val.price * (quantities[val.id] || 1)}</h4>
          </span>
          <p className='left'>SHIPPING:</p>
          <span className='rightside'>
            <h4>FREE</h4>
          </span>
          <hr />
          <p className='left'>TOTAL:</p>
          <span className='rightside'>
            <h4>$ {val.price * (quantities[val.id] || 1)}</h4>
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
