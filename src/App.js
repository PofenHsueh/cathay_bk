import './App.css';
import { AppRoutes } from './routes/routes';
import { AppContextProvider } from './store/appStore';

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AppContextProvider>
  );
}

export default App;
