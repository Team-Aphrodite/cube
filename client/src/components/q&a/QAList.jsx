/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, {
  useState, useContext, useEffect, lazy, Suspense,
} from 'react';
import { ProductsContext } from '../state/ProductsContext.jsx';
import QASearch from './QASearch.jsx';
import Question from './Question.jsx';
import { QAContext } from '../state/QAContext.jsx';
import withClickTracker from '../shared/ClickTracker.jsx';
import './qa-style.scss';

const QuestionModal = lazy(() => import('./QuestionModal.jsx'));

const QAList = () => {
  const { currentProduct, getData } = useContext(ProductsContext);
  const { getQuestions } = useContext(QAContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [defaultQuestions, setDefaultQuestions] = useState(2);
  const [expanded, setExpanded] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const getQAList = async () => {
    if (!currentProduct) { return null; }
    const productId = currentProduct.id;
    const fetchedData = await getQuestions(productId, 1, 100);
    return fetchedData;
  };

  // useEffect(() => {
  //   getData('17092');
  // }, []);

  useEffect(() => {
    getQAList()
      .then((fetched) => {
        if (fetched) {
          const sorted = fetched.sort((a, b) => ((a.question_helpfulness > b.question_helpfulness) ? -1 : 1));
          setData(sorted);
          setFilteredData(sorted);
        }
      })
      .catch((err) => console.log(err));
  }, [currentProduct]);

  const loadData = () => {
    getQAList()
      .then((fetched) => {
        if (fetched) {
          const sorted = fetched.sort((a, b) => ((a.question_helpfulness > b.question_helpfulness) ? -1 : 1));
          setData(sorted);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const loadMore = () => {
    setDefaultQuestions(defaultQuestions + 2);
    if (defaultQuestions >= filteredData.length) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if (filteredData != null) {
      if (filteredData.length <= 2) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    }
  }, [filteredData]);

  useEffect(() => {
    setDefaultQuestions(2);
    setExpanded(null);
  }, [currentProduct]);

  const onSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());

    const searchResults = [];

    if (search.length > 2) {
      data.forEach((question) => {
        const lowerCaseQuestion = question.question_body.toLowerCase();
        if (lowerCaseQuestion.includes(search)) {
          searchResults.push(question);
        }
      });
      setFilteredData(searchResults);
    } else {
      setFilteredData(data);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const TrackedQuestionModal = withClickTracker(QuestionModal);
  const TrackedQASearch = withClickTracker(QASearch);
  const TrackedQuestion = withClickTracker(Question);

  return (
    <div className="qa-flex-container">
      <div className="qa-container">
        <h2 className="qa-header">QUESTIONS & ANSWERS</h2>
        {TrackedQASearch({ searchText: search, onSearchChange })}
        <div className="qa-list">
          { filteredData
            ? filteredData.slice(0, defaultQuestions).map((q) => (
              <TrackedQuestion
                question={q}
                key={q.question_id}
                setData={setData}
                getQAList={getQAList}
              />
            ))
            : 'Loading..'}
        </div>
        <div className="qa-list-btn-container">
          {expanded ? <button className="first-outer-question-btn" onClick={loadMore}>MORE ANSWERED QUESTIONS</button> : null}
          <button className="second-outer-question-btn" onClick={openModal}>ADD A QUESTION</button>
        </div>
      </div>
      { modalOpen ? (
        <Suspense fallback={<div>Loading...</div>}>
          <TrackedQuestionModal
            closeModal={closeModal}
            updateList={loadData}
            setData={setData}
            getQAList={getQAList}
          />
        </Suspense>
      ) : null}
    </div>
  );
};

export default QAList;
