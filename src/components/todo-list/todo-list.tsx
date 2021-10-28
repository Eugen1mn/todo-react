import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getObjectById from '../../utils/getObjectById';
import { Option } from '../../const/predicates';

//components
import TodoListItem from '../todo-list-item';

//styles
//@ts-ignore
import style from './style.module.css';

//const
import filterPredicate from '../../const/predicates';

//selectors
import { GetTodoList, GetFilter } from 'selectors/todos';

const TodoList = () => {
  const todos = useSelector(GetTodoList);
  const filter: Option = useSelector(GetFilter);

  const dispatch = useDispatch();

  const handleIsDoneClick = useCallback(
    (id) => {
      const task = getObjectById(todos, id);
      task.isDone = !task.isDone;

      dispatch({ type: 'ASYNC_ISDONE_TODOS_TASK', payload: { task, id } });
    },
    [todos]
  );

  const handleUpdateTextClick = useCallback(
    (id, newText) => {
      const task = getObjectById(todos, id);
      task.text = newText;

      dispatch({
        type: 'ASYNC_UPDATE_TODOS_TASK',
        payload: { task, id, newText },
      });
    },
    [todos]
  );

  const handleDeleteClick = useCallback((id) => {
    dispatch({ type: 'ASYNC_DELETE_TODOS_TASK', payload: id });
  }, []);

  useEffect(() => {
    dispatch({ type: 'ASYNC_TODOS_LOADED' });
    dispatch({ type: 'ALL' });
  }, []);
  const filteredTodos = useMemo(
    () => todos?.filter(filterPredicate[filter]),
    [filter, todos]
  );
  return (
    <ul className={style.todoList}>
      {filteredTodos?.map((el) => (
        <TodoListItem
          key={el._id}
          id={el._id}
          text={el.text}
          isDone={el.isDone}
          handleIsDoneClick={handleIsDoneClick}
          onDeleteClick={handleDeleteClick}
          onUpdateTextClick={handleUpdateTextClick}
        />
      ))}
    </ul>
  );
};

export default TodoList;