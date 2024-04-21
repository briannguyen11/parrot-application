import "./App.css";
import Home from "./pages/Home";
import Spotlight from "./components/Spotlight";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />}>
        <Route index element={<Feed />} />
        <Route path="spotlight" element={<Spotlight />} />
      </Route>

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
