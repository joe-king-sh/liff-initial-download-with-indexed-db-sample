import type { Meta, StoryObj } from "@storybook/react";
import { DownloadConfirmModal } from "./DownloadConfirmModal";

const meta: Meta<typeof DownloadConfirmModal> = {
  title: "Pages/TopPage/DownloadConfirmModal",
  component: DownloadConfirmModal,
  tags: ["autodocs"],
};

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof DownloadConfirmModal>;

export const Default: Story = {
  render: () => (
    <DownloadConfirmModal
      isOpen={true}
      isDownloading={false}
      onDownload={() => undefined}
      onCancel={() => undefined}
    />
  ),
  args: {},
};

export const Downloading: Story = {
  render: () => (
    <DownloadConfirmModal
      isOpen={true}
      isDownloading={true}
      onDownload={() => undefined}
      onCancel={() => undefined}
    />
  ),
  args: {},
};
