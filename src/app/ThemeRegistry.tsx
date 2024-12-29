"use client";

import { ThemeProvider,createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// Create the custom Material UI theme
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Geist Sans, Arial, sans-serif",
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
