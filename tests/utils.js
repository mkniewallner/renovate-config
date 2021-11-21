import { readFileSync } from "fs";

export function loadRenovateConfiguration(filePath = "default.json") {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

export function loadFixture(filePath) {
  return readFileSync(`tests/__fixtures__/${filePath}`, "utf8");
}
