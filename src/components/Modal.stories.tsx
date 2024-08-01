import type { Meta, StoryObj, Decorator } from "@storybook/react";
import { Modal } from "./Modal";

const withPortalRoot: Decorator = (Story) => (
  <>
    <div id="portal" />
    <Story />
  </>
);

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [withPortalRoot],
};

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof Modal>;

export const DefaultModal: Story = {
  render: () => <Modal isOpen={true}>モーダル</Modal>,
};
