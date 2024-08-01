import type { Meta, StoryObj } from "@storybook/react";
import { TopPage } from "./TopPage";

const meta: Meta<typeof TopPage> = {
  title: "Pages/TopPage",
  component: TopPage,
};

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof TopPage>;

export const Default: Story = {
  render: () => <TopPage />,
};
