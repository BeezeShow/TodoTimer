/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  handleChangeTask = (event) => {
    const { onChange } = this.props;
    const { value } = event.target;
    onChange(value);
  };

  handleChangeMin = (event) => {
    const { onMinutesChange } = this.props;
    const { value } = event.target;
    onMinutesChange(value);
  };

  handleChangeSec = (event) => {
    const { onSecondsChange } = this.props;
    const { value } = event.target;
    if (value <= 59) {
      onSecondsChange(value);
    } else {
      onSecondsChange('59');
    }
  };

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit();
  };

  render() {
    const { value, minValue, secValue } = this.props;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={this.handleChangeTask}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            maxLength={3}
            onChange={this.handleChangeMin}
            value={minValue}
          />
          <input
            className="new-todo-form__timer"
            type="number"
            min="0"
            max="59"
            placeholder="Sec"
            onChange={this.handleChangeSec}
            value={secValue}
          />
          <button type="submit" />
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  value: 'New task is here',
  onChange: (text) => text,
  onSubmit: () => [],
};

NewTaskForm.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default NewTaskForm;
