// import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MyTheme } from "./components/styles/MyTheme";
import GlobalStyle from "./components/styles/GlobalStyle";

import Hub from "./components/Home";
import RegisterPage from "./components/RegisterPage";
import CalendarPage from "./pages/CalendarPage";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={MyTheme}>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/" element={<Hub />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};
export default App;
