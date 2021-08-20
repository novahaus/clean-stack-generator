import { Overrides } from "@material-ui/core/styles/overrides";
import components from "./components";

const overrides: Overrides = {
  ...components,
  MuiCssBaseline: {
    "@global": {
      body: {},
    },
  },
};

export default overrides;