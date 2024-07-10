import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Banner } from "./Banner";

const meta = {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
