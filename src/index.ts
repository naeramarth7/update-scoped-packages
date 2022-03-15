#!/usr/bin/env node

import { readFileSync } from "fs";
import * as path from "path";
import { execSync } from "child_process";

const packageJsonPath = path.resolve("./package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath).toString("utf-8"));

const scriptName = process.argv[1].split("/").reverse()[0];
const scope = process.argv[2];
const targetVersion = process.argv[3] || "latest";

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

execSync(`npm install ${dependencies.join(" ")}`);

console.log(`[${scriptName}] DONE\n`);
