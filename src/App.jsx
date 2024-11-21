import { Routes, Route, HashRouter } from 'react-router-dom';
import Login from '../login/login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Principal from '../principal/principal';

function App() {

  return (
   <HashRouter>
    <Routes>
    <Route path="/" element={<Login />}/>  
    <Route path="/login" element={<Login />}/>  
    <Route path="/principal" element={<Principal />}/>  
    </Routes >

   </HashRouter>
  )
}

export default App
