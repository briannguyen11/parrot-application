import "./App.css";
import Home from "./pages/Home";
import Spotlight from "./pages/Showcase";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/Login";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Feed from "./components/Feed";
import Create from "./pages/Create";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />}>
        <Route index element={<Feed />} />
        <Route path="showcase" element={<Spotlight />} />
        <Route path="settings" element={<div>settings</div>} />
        <Route path="help" element={<div>help</div>} />
        <Route path="report" element={<div>report</div>} />
        <Route path="messages" element={<div>messages</div>} />
      </Route>

      <Route path="/create" element={<Create />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
