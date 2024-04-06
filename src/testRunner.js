const cypress = require('cypress')
const fse = require('fs-extra')
const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator');
const { prepareResult } = require('./util');

const OUTPUT_FOLDER = 'mochawesome-report';
const OUTPUT_FILENAME = 'test-results.log';
const OUTPUT_FILEPATH = [OUTPUT_FOLDER, OUTPUT_FILENAME].join("/");

async function saveToFile(output) {
    return fse.writeJSON(OUTPUT_FILEPATH, output, {
        spaces: 2
    });
}

async function runTests() {
  try {
    await fse.remove(OUTPUT_FOLDER);
    await cypress.run();
    const jsonReport = await merge();
    const preparedResult = prepareResult(jsonReport);
    await saveToFile(preparedResult);
    await generator.create(jsonReport);
  } catch(err) {
    console.log("Catched:", err);
  }
}

runTests();