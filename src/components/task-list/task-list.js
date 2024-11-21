/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import './task-list.css';

class TaskList extends React.Component {
  render() {
    const { value, onActive, onDelete, onEdit, onChange, onSubmit, onPause, onPlay, filteredTodos } = this.props;
    const todosItems = filteredTodos.map((item) => {
      const { id, name, status, isEditing, isCompleted, minutes, seconds, isTimerOn } = item;
      return (
        <Task
          id={id}
          key={id}
          name={name}
          status={status}
          isEditing={isEditing}
          isCompleted={isCompleted}
          minutes={minutes}
          seconds={seconds}
          onClick={onActive}
          onDelete={onDelete}
          onEdit={onEdit}
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          onPause={onPause}
          onPlay={onPlay}
          isTimerOn={isTimerOn}
        />
      );
    });

    return <ul className="todo-list">{todosItems}</ul>;
  }
}

TaskList.defaultProps = {
  value: 'editing task',
  onActive: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

TaskList.propTypes = {
  value: PropTypes.string,
  onActive: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default TaskList;
