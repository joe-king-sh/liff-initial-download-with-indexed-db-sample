import { type FC } from "react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Spinner } from "@/components/Spinner";

type DownloadConfirmModalProps = {
  fileSize: string;
  isOpen: boolean;
  isDownloading: boolean;
  onDownload: () => Promise<void>;
  onCancel: () => void;
};

export const DownloadConfirmModal: FC<DownloadConfirmModalProps> = ({
  fileSize,
  isOpen,
  isDownloading,
  onDownload,
  onCancel,
}) => (
  <Modal isOpen={isOpen} className="w-[300px]">
    <div className="flex flex-col items-center gap-4 px-6 py-8 text-center">
      <h2 className="text-lg font-semibold">動画のダウンロード</h2>
      {isDownloading ? (
        <div className="flex flex-col items-center gap-4">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 text-sm">
            <p>テスト用の短い動画をダウンロードします。</p>
            <div>
              <p>(データのサイズ: 約{fileSize})</p>
              <p>
                ファイルサイズが大きいため、Wi-Fi環境でのダウンロードを推奨します。
              </p>
            </div>
            <p>※あとでダウンロードする場合はキャンセルを押してください。</p>
          </div>
          <div className="mt-2 flex w-full gap-2">
            <Button
              variant="outlined"
              property="primary"
              onClick={onCancel}
              className="p-0 text-sm"
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              property="primary"
              onClick={onDownload}
              className="p-0 text-sm"
            >
              ダウンロード
            </Button>
          </div>
        </>
      )}
    </div>
  </Modal>
);
