import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ColorPalettePage from './containers/ColorsPalettePage';
import CartPage from './containers/CartPage';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <>
          <Switch>
            <Route path="/" exact exact component={ColorPalettePage} />
            <Route path="/Cart" component={CartPage} />
            <Route render={() => <h2 className = "notFound">Sorry! Page not found.</h2>} />
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
