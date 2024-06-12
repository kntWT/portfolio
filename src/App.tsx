import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
