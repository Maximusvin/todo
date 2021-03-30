import Layout from './components/Layout/Layout';
import TodoApp from './components/TodoApp';

import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import './App.css';

function App() {
  return (
    <>
      <ReactNotification />
      <Layout>
        <TodoApp store={store} />
      </Layout>
    </>
  );
}

export default App;
