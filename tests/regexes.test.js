import { extractPackageFile } from "renovate/dist/modules/manager/regex";
import { loadFixture, loadRenovateConfiguration } from "./utils";

it("should find YAML dependencies", () => {
  const fileName = "ci.yml";

  const res = extractPackageFile(
    loadFixture(fileName),
    fileName,
    loadRenovateConfiguration()["regexManagers"][0]
  );

  expect(res).toMatchSnapshot();
});

it("should find pre-commit dependencies", () => {
  const fileName = ".pre-commit-config.yaml";

  const res = extractPackageFile(
    loadFixture(fileName),
    fileName,
    loadRenovateConfiguration()["regexManagers"][1]
  );

  expect(res).toMatchSnapshot();
});

it("should find dependencies in pyproject.toml", () => {
  const fileName = "pyproject.toml";

  const res = extractPackageFile(
    loadFixture(fileName),
    fileName,
    loadRenovateConfiguration()["regexManagers"][1]
  );

  expect(res).toMatchSnapshot();
});
