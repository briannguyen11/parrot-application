import "./App.css";
import Home from "./pages/Home";
import Spotlight from "./pages/Showcase";
import Profile from "./pages/Profile";
import Onboard from "./pages/Onboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Project from "./pages/Project";
import Feed from "./pages/Feed";
import Create from "./pages/Create";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// clear local storage before registering
function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />}>
        <Route index element={<Feed />} />
        <Route path="showcase" element={<Spotlight />} />
        <Route path="/project/:projectId" element={<Project />} />

        <Route path="help" element={<div>help</div>} />
        <Route path="report" element={<div>report</div>} />

        <Route path="campus" element={<div>campus</div>} />
        <Route path="saved" element={<div>saved</div>} />
      </Route>

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="/onboard" element={<Onboard />} />
      <Route
        path="messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterAndLogout />} />
      <Route path="/settings" element={<Settings />} />
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
