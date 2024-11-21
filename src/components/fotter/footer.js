import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../task-filter';
import './foter.css';

class Footer extends React.Component {
  render() {
    const { filterFlag, onDeletedAllCompleted, todos, onFilterChange } = this.props;
    const leftTasks = todos.filter((todo) => !todo.isCompleted);
    const leftString = ' items left';
    return (
      <footer className="footer">
        <span className="todo-count">
          {leftTasks.length}
          {leftString}
        </span>
        <TaskFilter filterFlag={filterFlag} onFilterChange={onFilterChange} />
        <button type="button" className="clear-completed" onClick={onDeletedAllCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  todos: [],
  filterFlag: 'All',
  onDeletedAllCompleted: () => {},
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.instanceOf(Date),
      isEditing: PropTypes.bool,
      isCompleted: PropTypes.bool,
    })
  ),
  filterFlag: PropTypes.string,
  onDeletedAllCompleted: PropTypes.func,
};

export default Footer;
