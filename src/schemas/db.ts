// db.ts
import Dexie, { type EntityTable } from "dexie";

type Video = {
  id: string;
  registeredAt: Date;
  blob: Blob;
};

const db = new Dexie("VideosDatabase") as Dexie & {
  videos: EntityTable<
    Video,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  videos: "++id, registeredAt, blob", // primary key "id" (for the runtime!)
});

export type { Video };
export { db };
