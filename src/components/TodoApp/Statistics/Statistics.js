import s from './Statistics.module.css';

const Statistics = ({ stats }) => (
  <div className={s.statisticsWrap}>
    <p>Всього тасок: {stats.allTodos}</p>
    <p>Виконано: {stats.completedTodo}</p>
    <p>Залишилось виконати: {stats.allTodos - stats.completedTodo}</p>
  </div>
);

export default Statistics;
