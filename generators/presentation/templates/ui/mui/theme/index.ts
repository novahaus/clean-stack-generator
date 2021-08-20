import { createTheme } from "@material-ui/core/styles";
import palette from "./palette";
import overrides from "./overrides";
import typography from "./typography";

export const theme = createTheme({
  palette,
  overrides,
  typography,
});