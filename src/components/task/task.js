/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';

class Task extends React.Component {
  state = {
    isOn: false,
  };

  handleChange = (event) => {
    const { onChange } = this.props;
    const { value } = event.target;
    onChange(value);
  };

  handleSubmit = (event) => {
    const { onSubmit, id } = this.props;
    event.preventDefault();
    onSubmit(id);
  };

  handlePlay = (id) => {
    const { onPlay } = this.props;
    this.setState({
      isOn: true,
    });
    onPlay(id);
  };

  handlePause = (id) => {
    const { onPause } = this.props;
    this.setState({
      isOn: false,
    });
    onPause(id);
  };

  handleComplitedClick = (id) => {
    const { onClick, onPause } = this.props;
    this.setState({ isOn: false });
    onPause(id);
    onClick(id);
  };

  render() {
    const {
      name,
      id,
      status,
      isCompleted = false,
      isEditing,
      minutes,
      seconds,
      onClick,
      onDelete,
      onEdit,
      value,
      isTimerOn,
    } = this.props;
    const { isOn } = this.state;
    if (isEditing) {
      return (
        <li className="editing">
          <div className="view"> </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="edit" value={value} onChange={this.handleChange} />
          </form>
        </li>
      );
    }
    return (
      <li className={isCompleted ? 'completed' : ''}>
        <div className="view">
          <input
            className="toggle"
            checked={isCompleted}
            type="checkbox"
            onClick={() => this.handleComplitedClick(id)}
            onChange={(e) => e.target.checked}
          />
          <label>
            <span className="title" onClick={() => onClick(id)}>
              {name}
            </span>
            <span className="description timer">
              <button
                type="button"
                className="icon icon-play"
                onClick={() => this.handlePlay(id)}
                disabled={isCompleted || isOn || isTimerOn}
              />
              <button
                type="button"
                className="icon icon-pause"
                onClick={() => this.handlePause(id)}
                disabled={isCompleted || !isTimerOn}
              />
              {Number(minutes) !== 0 || Number(seconds) !== 0 ? `    ${minutes}:${seconds}` : '    Time is over!'}
            </span>
            <span className="description">
              {`created ${formatDistanceToNow(status.toString(), {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button
            aria-label="edit form"
            type="button"
            className="icon icon-edit"
            onClick={() => onEdit(id)}
            disabled={isCompleted}
          />
          <button aria-label="delete form" type="button" className="icon icon-destroy" onClick={() => onDelete(id)} />
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  name: 'To do something',
  id: 1001,
  isEditing: false,
  isCompleted: false,
  status: new Date(),
  value: 'editing task',
  onClick: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

Task.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  isEditing: PropTypes.bool,
  isCompleted: PropTypes.bool,
  status: PropTypes.instanceOf(Date),
  value: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Task;
