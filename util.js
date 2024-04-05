const { randomUUID } = require("crypto");

function prepareResult(cypressResult) {
  const { stats, results } = cypressResult;
  
  const buildid = randomUUID();  // Using a random uuid as buildId (buildId not found in logs.)
  const buildStats = {
    buildid: buildid,
    startdatetime: stats.start,
    enddatetime: stats.end,
    duration: stats.duration,
    suits: stats.suites,
    tests: stats.tests,
    passescount: stats.passes,
    pendingcount: stats.pending,
    failurecount: stats.failures,
    testregisteredcount: stats.testsRegistered,
    passpercent: stats.passPercent,
    pendingpercent: stats.pendingPercent,
    skippedcount: stats.skipped,
    buildtype: "cypress"
  };

  const tests = [];

  for(const result of results) {
    const { file, suites } = result;

    for(const suite of suites) {
      const { uuid, title, duration } = suite;

      const test = {
        uuid: uuid,
        title: title,
        duration: duration,
        file: file,
        build_id: buildid
      }
      tests.push(test);
    }
  }

  const payload = {
    buildStats,
    tests,
  }

  return payload;
}

module.exports = {
  prepareResult
}