import { Provider } from 'react-redux';
import { store } from './shared/store';
import { AppRoutes } from './config/routes';
import './index.css';

export function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}
