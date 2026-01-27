import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./component/Nav";
import Home from "./component/Home";
import Paste from "./component/Paste";
import Viewpaste from "./component/Viewpaste";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/pastes",
    element: (
      <Layout>
        <Paste />
      </Layout>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <Layout>
        <Viewpaste />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
