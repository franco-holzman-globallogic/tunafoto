import fs from "fs";
import path from "path";

export function getImages(folder: string) {
  const dirPath = path.join(process.cwd(), "public/fotografia", folder);

  const files = fs.readdirSync(dirPath);

  return files.map((file) => `/fotografia/${folder}/${file}`);
}