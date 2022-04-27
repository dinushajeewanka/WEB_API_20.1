import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/signUp';
import Home from './components/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (

    <BrowserRouter>
    
    <Routes>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Home' element={<Home/>}/>
    </Routes>
    
    </BrowserRouter>

  );
}

export default App;
