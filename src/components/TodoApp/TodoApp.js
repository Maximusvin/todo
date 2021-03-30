import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import TodoEditor from './TodoEditor';
import Statistics from './Statistics';
import Filter from './Filter';

import s from './TodoApp.module.css';

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filter: '',
    };

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.onNotification = this.onNotification.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
    this.stats = this.stats.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.getVisibleTodo = this.getVisibleTodo.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
    this.updateTodoText = this.updateTodoText.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('todos')) {
      this.setState({ todos: JSON.parse(localStorage.getItem('todos')) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo(text) {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
      onUpdateTodo: false,
    };

    this.setState(({ todos }) => ({ todos: [...todos, newTodo] }));
  }

  deleteTodo(id) {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== id),
    }));
    this.onNotification('default', 'Ви щойно видалили таску', 'Увага');
  }

  handleCompleted(id) {
    this.setState(({ todos, completed }) => ({
      todos: todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
    this.onNotification('warning', 'Ви змінили статус вашої таски', 'Увага');
  }

  updateTodoItem(id) {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === id ? { ...todo, onUpdateTodo: !todo.onUpdateTodo } : todo,
      ),
    }));
  }

  updateTodoText(id, text) {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === id
          ? { ...todo, text, onUpdateTodo: !todo.onUpdateTodo }
          : todo,
      ),
    }));
  }

  onNotification(type, message, title) {
    this.props.store.addNotification({
      title,
      message,
      type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  }

  handleFilter(e) {
    this.setState({ filter: e.target.value.trim().toLowerCase() });
  }

  getVisibleTodo() {
    return this.state.todos.filter(todo =>
      todo.text.toLowerCase().includes(this.state.filter),
    );
  }

  stats() {
    const { todos } = this.state;
    return {
      allTodos: todos.length,
      completedTodo: todos.reduce(
        (completed, todo) => (todo.completed ? completed + 1 : completed),
        0,
      ),
    };
  }

  resetFilter() {
    this.setState({ filter: '' });
  }

  render() {
    const { todos, filter } = this.state;
    const { store } = this.props;
    const statistics = this.stats();
    const visibleTodos = this.getVisibleTodo();

    return (
      <section className={s.todoWrap}>
        <h2 className={s.title}>To do</h2>

        {todos.length > 0 && (
          <div className={s.infoWrap}>
            <Statistics stats={statistics} />
            <Filter
              onFilter={this.handleFilter}
              filter={filter}
              onResetFilter={this.resetFilter}
            />
          </div>
        )}

        {todos.length > 0 && (
          <TodoList
            todos={visibleTodos}
            onDelete={this.deleteTodo}
            onCompleted={this.handleCompleted}
            onUpdate={this.updateTodoItem}
            onUpdateText={this.updateTodoText}
            filter={filter}
          />
        )}

        <TodoEditor onAddTodo={this.addTodo} store={store} />
      </section>
    );
  }
}

export default TodoApp;
