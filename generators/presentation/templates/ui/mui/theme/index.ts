import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import overrides from "./overrides";
import typography from "./typography";

export * from './cache';

export const theme = createTheme({
  palette,
  overrides,
  typography,
});