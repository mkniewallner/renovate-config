import { extractPackageFile } from "renovate/dist/modules/manager/index";
import { matchRegexOrGlob } from "renovate/dist/util/string-match";
import { describe, expect, it, test } from "vitest";
import { loadFixture, loadRenovateConfiguration } from "./utils";

function regexOrGlobMatches(target: string, patterns: string[]): boolean {
  return patterns.some((pattern: string) => {
    return matchRegexOrGlob(target, pattern);
  });
}

describe("Update PEP 440 Python dependencies", () => {
  const regexManager = loadRenovateConfiguration()["customManagers"][0];

  it("finds dependencies", () => {
    const fileName = ".pre-commit-config.yaml";
    expect(
      extractPackageFile("regex", loadFixture(fileName), fileName, regexManager),
    ).toMatchSnapshot();
  });

  describe("matches patterns", () => {
    test.each([
      [".pre-commit-config.yaml", true],
      ["foo/.pre-commit-config.yaml", true],
      ["foo/bar/.pre-commit-config.yaml", true],
      ["apre-commit-configayaml", false],
      [".pre-commit-config.yamlfoobar", false],
    ])('regexOrGlobMatches("%s") === %s', (path, expected) => {
      expect(regexOrGlobMatches(path, regexManager.managerFilePatterns)).toBe(expected);
    });
  });
});
