import React from 'react';

//components
import Filter from '../option';

//style
import style from './style.module.css';

//api;
import ApiService from '../../api';
import { useDispatch } from 'react-redux';
const api = new ApiService();

const TodoOptions = ({ filters }) => {
  const dispatch = useDispatch();

  const handleFilterChange = (actionName) => {
    dispatch({ type: actionName });
  };

  const handleClearClicked = () => {
    api.deleteAllComplited().then(() => {
      dispatch({ type: 'CLEAR_ISDONE_TODOS_TASKS' });
      handleFilterChange('ALL');
    });
  };

  return (
    <div className={style.todoOptions}>
      {filters.map((item) => (
        <Filter onFilterChange={handleFilterChange} key={item} name={item} />
      ))}
      <button onClick={handleClearClicked}>Clear All</button>
    </div>
  );
};

export default TodoOptions;
