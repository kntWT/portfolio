import { createTheme } from "@mui/material/styles";

/**
 * ポートフォリオ全体のUIスタイルを定義するMUIテーマ設定
 * 白黒を基調とし、既存のブルーをアクセントカラーとして定義しています。
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#111111", // メインカラー（黒）
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1976d2", // アクセントカラー（既存のブルー）
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#fafafa",
    },
    text: {
      primary: "#111111",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"LINE Seed JP", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
          border: "1px solid #eaeaea",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#111111",
          boxShadow: "none",
          borderBottom: "1px solid #eaeaea",
        },
      },
    },
  },
});
