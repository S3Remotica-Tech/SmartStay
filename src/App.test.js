import { render} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; 
import App from './App';


beforeAll(() => {
   global.scrollTo = jest.fn();

});


describe('checks for app.js', () => {
  it('renders learn react', () => {
  
  const mockStore = configureStore()
  const store = mockStore({
    login: {

    }
  })
  render(
    <Provider store={store}>
        <App />
    </Provider>
  );
  })
})
