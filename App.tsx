import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/layouts/navBar";
import TopBar from "./components/layouts/topBar";
import Breadcrumbs from "./components/layouts/breadCrumbs";
import AppRoutes from "./routes/all-routes";

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen bg-gray-100'>
        <TopBar userName='Mohammed Ahmed' productName='Product Name' />
        <NavBar />
        <div className='px-6 pt-4'>
          <Breadcrumbs />
        </div>
        <main className='flex-1 p-6'>
          <div>
            <Routes>{AppRoutes}</Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
