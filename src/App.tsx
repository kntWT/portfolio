import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";

const theme = createTheme({
  typography: {
    fontFamily: '"LINE Seed JP", sans-serif',
  },
});

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
