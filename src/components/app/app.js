/* eslint-disable prettier/prettier */
import React from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../fotter';
import './app.css';

class App extends React.Component {
  state = {
    todoData: [],
    filterFlag: 'all',
    inputValue: '',
    inputMin: '',
    inputSec: '',
    editInputValue: '',
    isTimerCompleted: false,
  };

  getTaskId = () => Math.floor(Math.random() * 1000);

  makeComplited = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const elem = todoData[index];
      const isCompleted = !elem.isCompleted;
      const newElem = {
        ...elem,
        isCompleted,
        isTimerOn: false,
        timerId: clearInterval(elem.timerId),
      };
      const newArray = [
        ...todoData.slice(0, index),
        newElem,
        ...todoData.slice(index + 1),
      ];
      return {
        todoData: newArray,
        isTimerCompleted: false,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(() => {
      const { todoData } = this.state;
      const currentTask = todoData.filter((todo) => todo.id === id);
      const [task] = currentTask;

      return {
        timerId: clearInterval(task.timerId),
      };
    });
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((elem) => elem.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addInputValue = (text) => {
    this.setState({
      inputValue: text,
    });
  };

  addMinutesValue = (text) => {
    if (Number(text) < 10) {
      this.setState({
        inputMin: `0${Number(text)}`,
      });
    } else {
      this.setState({
        inputMin: `${Number(text)}`,
      });
    }
  };

  addSecondsValue = (text) => {
    if (Number(text) < 10) {
      this.setState({
        inputSec: `0${Number(text)}`,
      });
    } else {
      this.setState({
        inputSec: `${Number(text)}`,
      });
    }
  };

  addNewtask = () => {
    const { inputValue, inputMin, inputSec } = this.state;

    if (!inputValue || !inputMin || !inputSec) {
      return;
    }
    const minutes = Number(inputMin);
    const seconds = Number(inputSec);
    if (Number.isNaN(minutes) || Number.isNaN(seconds) || minutes < 0 || seconds < 0) {
      return;
    }

    const newTask = {
      id: this.getTaskId(),
      name: inputValue.trim(),
      status: new Date(),
      isEditing: false,
      isCompleted: false,
      minutes,
      seconds,
      timerId: null,
      isTimerOn: false,
    };

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newTask],
      inputMin: '',
      inputSec: '',
      inputValue: '',
    }));
  };

  changeFilter = (filterFlag) => {
    this.setState({ filterFlag });
  };

  deleteAllCompletedTasks = () => {
    this.setState(({ todoData }) => {
      const activeTasks = todoData.filter((todo) => !todo.isCompleted);
      return {
        todoData: activeTasks,
      };
    });
  };

  editTask = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const elem = todoData.find((el) => el.id === id);
      const newElem = {
        ...elem,
        isEditing: !elem.isEditing,
      };

      const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
        editInputValue: newElem.name,
      };
    });
  };

  editInputValue = (text) => {
    this.setState({
      editInputValue: text,
    });
  };

  changeTask = (id) => {
    const { editInputValue } = this.state;

    if (editInputValue.trim()) {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((el) => el.id === id);
        const elem = todoData.find((el) => el.id === id);
        const newElem = {
          ...elem,
          name: editInputValue.trim(),
          isEditing: !elem.isEditing,
        };
        const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];
        return {
          todoData: newArray,
          editInputValue: '',
        };
      });
    }
  };

  pauseTimer = (id) => {
    const { todoData } = this.state;
    const currentTask = todoData.filter((todo) => todo.id === id);
    const [task] = currentTask;
    const index = todoData.findIndex((el) => el.id === id);
    const newTask = {
      ...task,
      timerId: clearInterval(task.timerId),
      isTimerOn: false,
    };
    const newArray = [...todoData.slice(0, index), newTask, ...todoData.slice(index + 1)];
    this.setState({
      todoData: newArray,
    });
  };

  formatMinutes = (minutes, seconds) => {
    const mins = Number(minutes) || 0;
    const secs = Number(seconds) || 0;

    switch (true) {
    case secs === 0 && mins > 0:
      return String(mins - 1).padStart(2, '0');
    case secs === 0 && mins === 0:
      return '00';
    default:
      return String(mins).padStart(2, '0');
    }
  };

  formatSeconds = (seconds) => {
    let sec = '';
    if (Number(seconds) > 0 && Number(seconds) <= 10) {
      sec = `0${Number(seconds) - 1}`;
    } else if (Number(seconds) === 0) {
      sec = '59';
    } else {
      sec = `${Number(seconds) - 1}`;
    }
    return sec;
  };

  startTimer = (id) => {
    const { todoData, isTimerCompleted } = this.state;
    const currentTask = todoData.filter((todo) => todo.id === id);
    const [task] = currentTask;
    if (isTimerCompleted) {
      return;
    }
    if (task.timerId) {
      this.updateTimer(id);
    } else if (!task.isTimerOn) {
      this.createTimer(id);
    }
  };

  createTimer = (id) => {
    const setTimer = setInterval(() => {
      const { todoData } = this.state;
      const currentTask = todoData.find((todo) => todo.id === id);
      const index = todoData.findIndex((el) => el.id === id);
      const { minutes, seconds } = currentTask;

      const mins = this.formatMinutes(minutes, seconds);
      const sec = this.formatSeconds(seconds);

      if (Number(minutes) === 0 && Number(seconds) === 1) {
        clearInterval(setTimer);
        this.setState({
          isTimerCompleted: true,
          todoData: [
            ...todoData.slice(0, index),
            { ...currentTask, timerId: null, isTimerOn: false, minutes: '00', seconds: '00' },
            ...todoData.slice(index + 1)
          ]
        });
        return;
      }

      const newTask = {
        ...currentTask,
        minutes: mins,
        seconds: sec,
        timerId: setTimer,
        isTimerOn: true,
      };

      const newArray = [...todoData.slice(0, index), newTask, ...todoData.slice(index + 1)];
      this.setState({
        todoData: newArray,
      });
    }, 1000);
  };

  updateTimer = (id) => {
    const { todoData } = this.state;
    const currentTask = todoData.filter((todo) => todo.id === id);
    const [task] = currentTask;

    const mins = this.formatMinutes(task.minutes, task.seconds);
    const sec = this.formatSeconds(task.seconds);

    const newTask = {
      ...task,
      minutes: mins,
      seconds: sec,
    };

    const newArray = [...todoData];
    const index = todoData.findIndex((el) => el.id === id);
    newArray[index] = newTask;

    this.setState({
      todoData: newArray,
    });
  };

  render() {
    const { todoData, inputValue, filterFlag, editInputValue, inputMin, inputSec } = this.state;

    let filteredTodos = [...todoData];
    if (filterFlag === 'active') {
      filteredTodos = filteredTodos.filter((todo) => !todo.isCompleted);
    }
    if (filterFlag === 'completed') {
      filteredTodos = filteredTodos.filter((todo) => todo.isCompleted);
    }

    return (
      <section className="todoapp">
        <NewTaskForm
          onChange={this.addInputValue}
          onMinutesChange={this.addMinutesValue}
          onSecondsChange={this.addSecondsValue}
          onSubmit={this.addNewtask}
          minValue={inputMin}
          secValue={inputSec}
          value={inputValue}
        />
        <section className="main">
          <TaskList
            todos={todoData}
            filteredTodos={filteredTodos}
            onActive={this.makeComplited}
            onDelete={this.deleteTask}
            onEdit={this.editTask}
            value={editInputValue}
            onChange={this.editInputValue}
            onSubmit={this.changeTask}
            onPause={this.pauseTimer}
            onPlay={this.startTimer}
          />
          <Footer
            todos={todoData}
            filterFlag={filterFlag}
            onFilterAll={this.filterAll}
            onFilterActive={this.filterActive}
            onFilterCompleted={this.filterCompleted}
            onDeletedAllCompleted={this.deleteAllCompletedTasks}
            onFilterChange={this.changeFilter}
          />
        </section>
      </section>
    );
  }
}

export default App;
