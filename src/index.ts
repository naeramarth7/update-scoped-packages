#!/usr/bin/env node

import { readFileSync, existsSync } from "fs";
import * as path from "path";
import { execSync } from "child_process";

const packageJsonPath = path.resolve("./package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath).toString("utf-8"));

const scriptName = process.argv[1].split("/").reverse()[0];
const scope = process.argv[2];
const targetVersion = process.argv[3] || "latest";

const isPnpm = existsSync("./pnpm-lock.yaml");
const isYarn = existsSync("./yarn.lock");

const installCmd = () => {
  switch (true) {
    case isPnpm: return 'pnpm add';
    case isYarn: return 'yarn add';
    default: return 'npm install';
  }
};

const dependencies = [
  // Get distinct dependency names
  ...Object.keys({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
  }),
]
  // Include only scoped packages
  .filter((dependency) => dependency.startsWith(`${scope}/`))

  // Add @targetVersion
  .map((dependency) => `${dependency}@${targetVersion}`);

console.log(
  `[${scriptName}] Updating dependencies: \n  * ${dependencies.join("\n  * ")}`
);

execSync(`${installCmd()} ${dependencies.join(" ")}`);

console.log(`[${scriptName}] DONE\n`);
