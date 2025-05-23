import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Home } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { PlayerProvider } from "./context/PlayerContext";
import { NavbarProvider } from "./context/NavbarContext";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <UserProvider>
          <NavbarProvider>
            <PlayerProvider>
              <BrowserRouter basename="/react-alpha-cast">
                <Routes>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                </Routes>
              </BrowserRouter>
            </PlayerProvider>
          </NavbarProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
