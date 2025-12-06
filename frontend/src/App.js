import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import Home from "./components/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/Footer";
import NewHomePage1 from "./components/NewHomePage1";
import NewHomePage2 from "./components/NewHomePage2";
import NewHomePage3 from "./components/NewHomePage3";

const theme = createTheme({
  typography: {
    fontFamily: "Changa, sans-serif",
  },
});

function App() {
  const [footerVisible, setFooterVisible] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/الرئيسية" element={<Home />} />
          <Route path="/sell" element={<NewHomePage1 />} />
          <Route path="/buy" element={<NewHomePage2 />} />
          <Route path="/finish" element={<NewHomePage3 />} />
        </Routes>
        {footerVisible && <Footer />}
      </Router>
    </ThemeProvider>
  );
}

export default App;
