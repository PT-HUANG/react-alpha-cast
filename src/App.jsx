import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome, Login, Home } from "./pages";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
