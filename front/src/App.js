import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";

import PHome from "./Pages/home";
import PRegistration from "./Pages/registration";
import PLogin from "./Pages/login";
import PUsers from "./Pages/users";
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoute";
import PMainPage from "./Pages/mainpage";
import PTransAnalyse from "./Pages/transanalyse";
import PrivateRouteUser from "./Components/PrivateRoutes/PrivateRouteUser";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PHome />} />
          <Route path="/registration" element={<PRegistration />} />
          <Route path="/login" element={<PLogin />} />

          <Route exact path='/users' element={<PrivateRoute/>}>
              <Route exact path='/users' element={<PUsers/>}/>
          </Route>

          <Route exct path='/transactions' element={<PrivateRouteUser/>}>
              <Route exact path='/transactions' element={<PMainPage/>}/>
          </Route>

          <Route exct path='/transAnalyse' element={<PrivateRouteUser/>}>
              <Route exact path='/transAnalyse' element={<PTransAnalyse/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
