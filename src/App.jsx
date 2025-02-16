import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome, Login, Home } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./Context/UserContext";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="login" element={<Login />} />
              <Route path="home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
