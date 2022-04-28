import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/signUp';
import Home from './components/Home';
import NavBar from './components/nav';
import MyPosts from './components/myPosts';
import CreatePost from './components/createPost';

import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (

    <BrowserRouter>
    {/* <NavBar user={userDetails?userDetails:null} /> */}
    <Routes>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/navbar' element={<NavBar/>}/>
      <Route path='/myposts' element={<MyPosts/>}/>
      <Route path='/createpost' element={<CreatePost/>}/>
    </Routes>
    
    </BrowserRouter>

  );
}

export default App;
