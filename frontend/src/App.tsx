import "./App.css";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Onboard from "./pages/Onboard";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OpenProjectInfo from "./pages/OpenProjectInfo";
import ShowcaseProject from "./pages/ShowcaseProject";
import OpenProjectPage from "./pages/OpenProjectPage";
import Create from "./pages/Create";
import ProtectedRoute from "./auth/ProtectedRoute";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import SearchResults from "./pages/SearchResults";
import { AuthProvider } from "./auth/AuthContext";
import init_globals from "./lib/globals";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Admin from "./pages/Admin";
import PublicProfile from "./pages/PublicProfile";
import ChatModal from "./components/messages/ChatModal";

// clear local storage before registering
function RegisterAndLogout() {
  localStorage.clear();
  return <SignUp />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />}>
        <Route index element={<Explore />} />
        <Route path="/open-projects" element={<OpenProjectPage />} />
        <Route path="/open-project/:projectId" element={<OpenProjectInfo />} />
        <Route
          path="/showcase-project/:projectId"
          element={<ShowcaseProject />}
        />

        <Route path="/search" element={<SearchResults />} />

        <Route path="help" element={<div>help</div>} />
        <Route path="report" element={<div>report</div>} />

        <Route path="campus" element={<div>campus</div>} />
        <Route path="saved" element={<div>saved</div>} />
        <Route path=":username" element={<PublicProfile />} />

        <Route path="/create" element={<Create />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/onboard"
        element={
          <ProtectedRoute>
            <Onboard />
          </ProtectedRoute>
        }
      />

      <Route path="messages" element={<Messages />} />

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<RegisterAndLogout />} />
      <Route path="/settings" element={<Settings />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  init_globals();

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <ChatModal />
      </AuthProvider>
    </>
  );
}

export default App;
