import { extractPackageFile } from "renovate/dist/modules/manager/custom/regex";
import { matchRegexOrGlob } from "renovate/dist/util/string-match";
import { describe, expect, test } from "vitest";
import { loadFixture, loadRenovateConfiguration } from "./utils";

function regexOrGlobMatches(target: string, patterns: string[]): boolean {
  return patterns.some((pattern: string) => {
    return matchRegexOrGlob(target, pattern);
  });
}

describe("Update PEP 440 Python dependencies", () => {
  const regexManager = loadRenovateConfiguration()["customManagers"][0];

  test.each([".pre-commit-config.yaml", "pyproject.toml"])(
    "find dependencies in `%s`",
    (fileName) => {
      expect(extractPackageFile(loadFixture(fileName), fileName, regexManager)).toMatchSnapshot();
    },
  );

  describe("matches regexes patterns", () => {
    test.each([
      [".pre-commit-config.yaml", true],
      ["apre-commit-configayaml", false],
      [".pre-commit-config.yamlfoobar", false],
      ["foo/.pre-commit-config.yaml", false],
      ["pyproject.toml", true],
      ["pyprojectatoml", false],
      ["pyproject.tomlfoobar", false],
      ["foo/pyproject.toml", false],
    ])('regexOrGlobMatches("%s") === %s', (path, expected) => {
      expect(regexOrGlobMatches(path, regexManager.managerFilePatterns)).toBe(expected);
    });
  });
});
