import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Radio } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Radio",
  },
};
