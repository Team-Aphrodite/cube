/* eslint-disable import/extensions */
import React from 'react';
import './App.css';

import { ProductsProvider } from './state/ProductsContext.jsx';
import { ReviewsProvider } from './state/ReviewsContext.jsx';
import { QAProvider } from './state/QAContext.jsx';

import Header from './header/Header.jsx';
import Main from './Overview/Main/Main.jsx';
import Related from './related/Related.jsx';
import Review from './reviews/ReviewsAndRatings.jsx';

import QA from './q&a/QAList.jsx';
// import Q&A component

function App() {
  return (
    <div>
      <Header />
      <ReviewsProvider>
        <ProductsProvider>
          <Main />
          <Related />
          <QAProvider>
            <QA />
          </QAProvider>
          <Review />
        </ProductsProvider>
      </ReviewsProvider>
    </div>
  );
}

export default App;
