import React, { useContext, useState } from 'react';
import { MyContext } from '../App';

function Child() {
  const { context } = useContext(MyContext);
  const [selectedValues, setSelectedValues] = useState({});

  const handleChange = (productId, productprice, event) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [productId]: event.target.value * parseInt(productprice),
    }));
  };

  return (
    <div>
      <div className="row">
        {context.products.map(product => (
          <div key={product.id} >
            <div id="box" className="card-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 className="card-title text-center mt-3"> {product.brand}</h1><br />
              <img className="card-img d-block mt-3 mx-3 " style={{ maxWidth: '200px', maxHeight: '200px' }} src={product.thumbnail} alt={product.title} />
              <div className="card-body">
                <h2 className="card-title mx-5 mt-3 text-center">{product.title}</h2>
                <p className="card-text m-5">
                  {`Description: ${product.description}`}<br />
                  {`Rating: ${product.rating} *`}<br />
                  {`Discount: ${product.discountPercentage}%`}<br />
                  {`Category: ${product.category}`}<br />
                  {`Stock: ${product.stock}`}
                            <h2>Price : ${ product.price}</h2>
                        </p>
                        <label><h4 className='mx-5'>Quantity : </h4></label>
                <select className='card mb-3 d-inline-block' onChange={(event) => handleChange(product.id, product.price, event)}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                {selectedValues[product.id] && (
                  <>
                    <h1 className='d-inline-block mx-3'> $ {selectedValues[product.id]}.00</h1>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h2  className='mx-3'>SUBTOTAL :</h2>
                      <h2  className='mx-3'>${selectedValues[product.id]}</h2>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h2 className='mx-3'>SHIPPING :</h2>
                      <h2  className='mx-3'>FREE</h2>            
                    </div><hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h2  className='mx-3'>TOTAL :</h2>
                      <h2  className='mx-3'>${selectedValues[product.id]}</h2>
                    </div>  
                     </>
                           
                )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Child;
