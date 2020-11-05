import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';
import ColorPalettePage from './containers/ColorsPalettePage';
import CartPage from './containers/CartPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className ="App">
      <Router>
        <NavigationBar />
        <>
            <Switch>
              <Route path="/" exact exact component={ColorPalettePage} />
              <Route path="/Cart" component={CartPage} />
              <Route render={()=><h2>Sorry! Page not found.</h2>} />
            </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
