import "../src/app/globals.css";

import type { Preview } from "@storybook/react";
import { withFonts } from "./decorator";

const preview: Preview = {
  decorators: [withFonts],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
