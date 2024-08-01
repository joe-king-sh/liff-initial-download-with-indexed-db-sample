import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { DownloadConfirmModal } from "./DownloadConfirmModal";
import { Button } from "@/components/Button";
import { useLogger } from "@/hooks/useLogger";
import { db, type Video } from "@/schemas/db";
import { buildAppTitle } from "@/utils/string";

export const TopPage = (): JSX.Element => {
  const logger = useLogger().logger;

  const [isOpen, setIsOpen] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const video = await db.videos.get("line-mini-app-initial-dl-test");
      if (video != null) {
        const url = URL.createObjectURL(video.blob);
        setVideoUrl(url);
        setIsOpen(false);
      }
    };
    fetchVideo().catch((error) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      logger.error({ message: "Error fetching video from IndexedDB:", error })
    );
  }, [logger]);

  const handleDownload = async () => {
    logger.info({ message: "Downloading video..." });
    setIsDownloading(true);
    try {
      const response = await fetch(
        "https://cdn.pixabay.com/video/2021/07/22/82399-578640983_large.mp4"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();

      const video: Video = {
        id: "line-mini-app-initial-dl-test",
        registeredAt: new Date(),
        blob: blob,
      };

      await db.videos.add(video);

      logger.info({ message: "Video downloaded and saved to IndexedDB" });
      setIsOpen(false);
      setVideoUrl(URL.createObjectURL(blob));
    } catch (error) {
      logger.error({ message: "Error downloading or saving video:", error });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await db.videos.delete("line-mini-app-initial-dl-test");
      if (videoUrl != null) {
        URL.revokeObjectURL(videoUrl);
      }
      setVideoUrl(null);
      console.log("Video deleted from IndexedDB");
    } catch (error) {
      console.error("Error deleting video from IndexedDB:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{buildAppTitle("LINE ミニアプリ 初期データDLテスト")}</title>
      </Helmet>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold">
            LINE Mini App 初期データDLテスト
          </h1>
          <p>
            初回起動時にアプリで使用するデータをダウンロードし、その後のデータ通信量を減らすテストサイトです。
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">このサイトで検証できること</p>
          <p>
            1. アプリを起動すると、データのダウンロードモーダルが起動します。
          </p>
          <p>
            2.
            ダウンロードを実行すると、音声データがブラウザ(IndexedDB)に保存されます。
          </p>
          <p>
            3.
            次回起動時には、ブラウザに保存されたデータを使用してアプリが起動します。
          </p>
        </div>

        {videoUrl != null ? (
          <div className="flex flex-col gap-4">
            <p className="font-bold">ダウンロードされた動画</p>
            <video src={videoUrl} controls className="mx-auto w-full max-w-md">
              お使いのブラウザは動画タグをサポートしていません。
              <track kind="captions" src="captions.vtt" label="Japanese" />
            </video>

            <Button variant="contained" property="error" onClick={handleDelete}>
              データを削除
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="font-bold">初期データのダウンロード</p>
            <p>アプリを利用開始するには初期データのダウンロードが必要です。</p>
            <Button
              variant="contained"
              property="primary"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              ダウンロード
            </Button>
          </div>
        )}

        <DownloadConfirmModal
          isOpen={isOpen}
          isDownloading={isDownloading}
          onDownload={handleDownload}
          onCancel={() => {
            setIsOpen(false);
          }}
        />
      </div>
    </>
  );
};
