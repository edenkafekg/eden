import { promises as fs } from "fs";
import path from "path";

export type CheckedMap = Record<string, boolean>;

const FILE_PATH = path.join(process.cwd(), ".data", "invoice-checklist.json");
const BLOB_STORE = "invoice-checklist";
const BLOB_KEY = "checked";

function isNetlifyRuntime() {
  return Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT);
}

async function getBlobStore() {
  if (!isNetlifyRuntime()) return null;
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore(BLOB_STORE);
  } catch {
    return null;
  }
}

async function readFileStore(): Promise<CheckedMap> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as CheckedMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeFileStore(checked: CheckedMap) {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(checked), "utf8");
}

export async function getCheckedMap(): Promise<CheckedMap> {
  const store = await getBlobStore();
  if (store) {
    const data = await store.get(BLOB_KEY, { type: "json" });
    if (data && typeof data === "object") return data as CheckedMap;
    return {};
  }
  return readFileStore();
}

export async function setCheckedMap(checked: CheckedMap): Promise<void> {
  const store = await getBlobStore();
  if (store) {
    await store.setJSON(BLOB_KEY, checked);
    return;
  }
  await writeFileStore(checked);
}

export async function upsertCheckedItems(
  items: Array<{ itemId: string; checked: boolean }>,
): Promise<CheckedMap> {
  const current = await getCheckedMap();
  for (const item of items) {
    if (item.checked) current[item.itemId] = true;
    else delete current[item.itemId];
  }
  await setCheckedMap(current);
  return current;
}

export async function resetCheckedMap(): Promise<CheckedMap> {
  await setCheckedMap({});
  return {};
}
