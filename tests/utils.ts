import { readFileSync } from "fs";
import * as JSON5 from "json5";

export function loadRenovateConfiguration(filePath = "default.json5") {
  return JSON5.parse(readFileSync(filePath, "utf8"));
}

export function loadFixture(filePath: string) {
  return readFileSync(`tests/__fixtures__/${filePath}`, "utf8");
}
