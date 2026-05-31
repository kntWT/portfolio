import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";
import { theme } from "./configs/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <CssBaseline />
          <Header />
          <Router />
          <Footer />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
