const jmespath = require("jmespath");
const { randomUUID } = require("crypto");

function prepareResult(cypressResult) {
    const buildStats = {
      buildid: randomUUID(),  // Using a random uuid as buildId (buildId not found in logs.)
      startdatetime: jmespath.search(cypressResult, "stats.start"),
      enddatetime: jmespath.search(cypressResult, "stats.end"),
      duration: jmespath.search(cypressResult, "stats.duration"),
      suits: jmespath.search(cypressResult, "stats.suites"),
      tests: jmespath.search(cypressResult, "stats.tests"),
      passescount: jmespath.search(cypressResult, "stats.passes"),
      pendingcount: jmespath.search(cypressResult, "stats.pending"),
      failurecount: jmespath.search(cypressResult, "stats.failures"),
      testregisteredcount: jmespath.search(cypressResult, "stats.testsRegistered"),
      passpercent: jmespath.search(cypressResult, "stats.passPercent"),
      pendingpercent: jmespath.search(cypressResult, "stats.pendingPercent"),
      skippedcount: jmespath.search(cypressResult, "stats.skipped"),
      buildtype: "cypress"
    };
  
    const payload = {
      buildStats,
    }
  
    return payload;
  }

  module.exports = {
    prepareResult
  }