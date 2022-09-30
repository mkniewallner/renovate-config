import { extractPackageFile } from "renovate/dist/modules/manager/regex";
import { regEx } from "renovate/dist/util/regex";
import { loadFixture, loadRenovateConfiguration } from "./utils";

function regexMatches(target: string, patterns: string[]): boolean {
  return patterns.some((pattern: string) => {
    return regEx(pattern).test(target);
  });
}

describe("Update YAML files", () => {
  const regexManager = loadRenovateConfiguration()["regexManagers"][0];

  it("find dependencies in `ci.yml`", () => {
    const fileName = "ci.yml";
    const res = extractPackageFile(loadFixture(fileName), fileName, regexManager);

    expect(res).toMatchSnapshot();
  });

  describe("matches regexes patterns", () => {
    test.each([
      ["ci.yml", true],
      ["ci.yaml", true],
      ["ci.yaaml", false],
      ["ciyml", false],
      ["ciyaml", false],
      ["ciayml", false],
      ["foo/ci.yaml", true],
      ["foo/bar/ci.yaml", true],
      ["foo/bar/foo_bar_3000.yaml", true],
    ])('regexMatches("%s") === %s', (path, expected) => {
      expect(regexMatches(path, regexManager.fileMatch)).toBe(expected);
    });
  });
});

describe("Update PEP 440 Python dependencies", () => {
  const regexManager = loadRenovateConfiguration()["regexManagers"][1];

  test.each([".pre-commit-config.yaml", "pyproject.toml"])(
    "find dependencies in `%s`",
    (fileName) => {
      expect(extractPackageFile(loadFixture(fileName), fileName, regexManager)).toMatchSnapshot();
    }
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
    ])('regexMatches("%s") === %s', (path, expected) => {
      expect(regexMatches(path, regexManager.fileMatch)).toBe(expected);
    });
  });
});
