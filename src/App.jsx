import "./App.scss";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome, Login, Home } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./Context/UserContext";
import { PlayerProvider } from "./Context/PlayerContext";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <AuthProvider>
          <UserProvider>
            <PlayerProvider>
              {/* <BrowserRouter> */}
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="login" element={<Login />} />
                <Route path="home" element={<Home />} />
              </Routes>
              {/* </BrowserRouter> */}
            </PlayerProvider>
          </UserProvider>
        </AuthProvider>
      </div>
    </HashRouter>
  );
}

export default App;
