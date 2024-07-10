import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Select",
    children: <option value="1">Option 1</option>,
  },
};
