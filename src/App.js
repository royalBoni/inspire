
import {BrowserRouter, Routes, Route, json} from 'react-router-dom'
import Header from './Header';
import Login from './Pages/LoginPage/Login';
import Register from './Pages/RegisterPage/Register';
import Home from './Pages/HomePage/Home';
import ForgotPassword from './Pages/forgotPassword/submitEmail/ForgotPassword';
import ChangePassword from './Pages/forgotPassword/changepassword/ChangePassword';
import Footer from './Footer';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Login/>} />
          <Route path='/register' element= {<Register/>} />
          <Route path='/home/:userID' element= {<Home/>} />
          <Route path='/forgot' element= {<ForgotPassword/>} />
          <Route path='/change/:email/:tokenized' element= {<ChangePassword/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
 
}

export default App;
