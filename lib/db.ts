import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "db.json");

export const getDb = () => {
  const jsonData = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(jsonData);
};

export const saveDb = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
