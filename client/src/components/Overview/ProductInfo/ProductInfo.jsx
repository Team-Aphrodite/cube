/* eslint-disable import/extensions */
import React, { useState } from 'react';
import './ProductInfo.css';
// eslint-disable-next-line import/extensions
import Styles from './Styles.jsx';
// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
import StarRating from '../../reviews/components/averageReview/metaRate.jsx';

function ProductInfo({currentProduct, currentStyle}) {
  const productStyles = currentStyle.results;
  // current style price
  const [currentPrice, setCurrentPrice] = useState(productStyles[0].original_price);
  const [salePrice, setSalePrice] = useState();
  // current SKU Stores Quantity and Sizes
  const [currentSku, setCurrentSku] = useState(productStyles[0].skus);

  // current Style Title
  const [currentStyleTitle, setCurrentStyleTitle] = useState(productStyles[0].name);
  // current Image Array
  // Star Component Rating
  const averageRating = 3.5;
  // UPDATE PRICE CLICK HANDLER
  const updateCurrent = (style) => {
    if (style.sale_price !== null) {
      setSalePrice(style.sale_price);
    } else {
      setSalePrice();
      setCurrentPrice(style.original_price);
    }
    setCurrentSku(style.skus);
    setCurrentStyleTitle(style.name);
  };
  return (
    <div className="Product-InfoAll">
      <div className="Product-Info-Top">
        <StarRating score={averageRating} />
        <h3>{currentProduct.category}</h3>
        <h2>{currentProduct.name}</h2>
        <span className={salePrice ? 'isSale' : null}>{currentPrice}</span>
        <span className="salePrice">{salePrice}</span>
      </div>
      <div className="Product-Info-Mid">
        <div className="Style-Title">
          STYLE &gt;
          {currentStyleTitle}
        </div>
        {productStyles.map((style, index) => (
          <Styles style={style}
            key={productStyles[index].style_id}
            current={() => { updateCurrent(style); }}
          />
        ))}
      </div>
      <div>Add Cart Section</div>
    </div>
  );
}

export default ProductInfo;
