import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome, Login, Home } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./Context/UserContext";
import { PlayerProvider } from "./Context/PlayerContext";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <UserProvider>
          <PlayerProvider>
            <BrowserRouter basename="/react-alpha-cast">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </PlayerProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
