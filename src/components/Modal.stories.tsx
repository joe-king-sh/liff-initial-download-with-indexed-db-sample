import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
};

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof Modal>;

export const DefaultModal: Story = {
  render: () => (
    <div className="">
      <Modal isOpen={true}>モーダル</Modal>
    </div>
  ),
};
