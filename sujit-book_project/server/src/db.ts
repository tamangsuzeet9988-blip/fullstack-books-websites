import fs from "fs-extra";
import path from "path";

const DB_PATH = path.join(__dirname, "..", "data", "db.json");

export async function readDB() {
    const data = await fs.readJSON(DB_PATH);
    return data;
}

export async function writeDB(data: any) {
    await fs.writeJSON(DB_PATH, data, { spaces: 2 });
}
