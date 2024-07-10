import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ContentInfo } from "./ContentInfo";

const meta = {
  title: "Components/ContentInfo",
  component: ContentInfo,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof ContentInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
