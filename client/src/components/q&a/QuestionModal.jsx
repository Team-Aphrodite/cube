/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ProductsContext } from '../state/ProductsContext.jsx';

const QuestionModal = ({
  closeModal, setData, getQAList, reportClick,
}) => {
  const { currentProduct } = useContext(ProductsContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');

  const postQuestion = () => {
    const productId = currentProduct.id;
    axios.post('/add/question', {
      body: question,
      name: name,
      email: email,
      product_id: productId,
    })
      .then(async (res) => {
        console.log('posted', res.data);
        setData(await getQAList());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    if (e.target.placeholder === 'Example:jack543!') {
      setName(e.target.value);
    } else if (e.target.placeholder === 'Example: jack@gmail.com') {
      setEmail(e.target.value);
    } else {
      setQuestion(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postQuestion();
    closeModal();
    setName('');
    setEmail('');
    setQuestion('');
  };

  return (
    <div
      tabIndex="-4"
      role="button"
      onClick={(e) => {
        reportClick(e, 'QuestionModal');
      }}
      onKeyDown={() => {}}
      className="question-modal"
    >
      {currentProduct && (
      <>
        <div className="question-modal-container">
          <h2 className="modal-title">Ask your Question</h2>
          <h3 className="modal-subtitle">
            About the
            {' '}
            {currentProduct.name}
          </h3>
          <form className="question-modal-form" onSubmit={handleSubmit}>
            <label className="modal-name">Nickname*</label>
            <input className="modal-name" placeholder="Example:jack543!" required type="text" maxLength="60" autoComplete="off" value={name} onChange={handleChange} />
            <br />
            <span className="modal-info">For privacy reasons, do not use your full name or email address.</span>
            <br />
            <label className="modal-email">Email*</label>
            <input className="modal-email" placeholder="Example: jack@gmail.com" required type="email" maxLength="60" autoComplete="off" value={email} onChange={handleChange} />
            <br />
            <span className="modal-info">For authentication reasons, you will not be emailed.</span>
            <br />
            <label className="modal-question-label">Question*</label>
            <input className="modal-question" required type="text" maxLength="1000" minLength="" autoComplete="off" value={question} onChange={handleChange} />
            <br />
            <div className="btn-container">
              <button className="modal-submit-btn" type="submit">Add</button>
              <button onClick={closeModal} className="close-question-modal-btn" type="button">Close</button>
            </div>
          </form>
        </div>
      </>
      )}
    </div>
  );
};

export default QuestionModal;
