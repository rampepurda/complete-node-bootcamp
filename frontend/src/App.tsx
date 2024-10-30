import './styles/main.scss'
import React from 'react';
import {RouterProvider} from "react-router-dom";
import { router as routers } from './routers/router'

function App() {
  return (
    <RouterProvider router={routers} />
  );
}

export default App;
