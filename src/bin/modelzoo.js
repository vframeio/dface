/**
 * VFRAME ModelZoo YAML -> JS converter
 * @module bin/load_modelzoo.js
 */

import { loadYAML, writeFile } from "utils/file_utils";

const modelzooPath = "./modelzoo.yaml";
const outputPath = "./src/constants/modelzoo.js";

const JSDOC_PREAMBLE = `/**
 * VFRAME Model Zoo (built from modelzoo.yaml)
 * @module constants/modelzoo.js
 */`;

async function loadModelZoo() {
  const data = await loadYAML(modelzooPath);

  const { models } = data;

  const options = Object.keys(models).map((name) => ({
    name,
    label: models[name].name,
  }));

  const jsonModels = JSON.stringify(models, undefined, 2);
  const jsonOptions = JSON.stringify(options, undefined, 2);

  const text = [
    JSDOC_PREAMBLE,
    `export const modelzoo = ${jsonModels};`,
    `export const modelzooOptions = ${jsonOptions};`,
  ].join("\n\n");

  console.log(`Writing to ${outputPath}`);
  await writeFile(outputPath, text);
  console.log("Done!");
  process.exit(0);
}

loadModelZoo();
