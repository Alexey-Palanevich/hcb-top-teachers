import * as fs from "node:fs";

const getPackages = () => {
  const packageJsonText = fs.readFileSync('./package.json', 'utf8');

  return JSON.parse(packageJsonText).dependencies;
}

const getPaths = (packages) => packages.map(pckg => ({
  name: pckg,
  message: `Do not use ${pckg} outside the Driver Layer`,
}))

/**
 * Make a rule to prevent package imports inside inner layers
 * @returns {{name: *, message: string}[]}
 */
export const getRestrictedImportsEslint = () => {
  const packages = getPackages();

  return getPaths(Object.keys(packages));
}