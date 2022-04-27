import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import 'bulma/css/bulma.min.css';
import SignIn from './Pages/SignIn';
import reportWebVitals from './reportWebVitals';
import PendingValidation from './Pages/PendingValidation';
import Catalog from './Pages/Catalog'
import {UserContextProvider} from './contexts/User'
import UserLoan from './Pages/UserLoan';
import { MediasContextProvider } from './contexts/Medias';
import Validation from './Pages/Validation';
import AddMedia from './Pages/AddMedia';

ReactDOM.render(
<UserContextProvider>
  <MediasContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="myloan" element={<UserLoan/>} />
        <Route path="catalog" element={<Catalog/>} />
        <Route path="add" element={<AddMedia />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="pending" element={<PendingValidation />} />
        <Route path="validation" element={<Validation />} />
      </Routes>
    </BrowserRouter>
  </MediasContextProvider>
</UserContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
