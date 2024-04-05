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
  const testCases = [];

  for(const result of results) {
    const { file, suites } = result;

    for(const suite of suites) {
      const { uuid, title, duration, tests: rawTests } = suite;

      const test = {
        id: uuid,
        title: title,
        duration: duration,
        file: file,
        build_id: buildid
      }
      tests.push(test);

      for(const rawTest of rawTests) {
        const { title, fullTitle, timedOut, duration, state, speed, pass, fail, pending, uuid, parentUUID, skipped, code } = rawTest;

        const testCase = {
          title: title,
          fulltitle: fullTitle,
          timedout: timedOut,
          duration: duration,
          state: state,
          speed: speed,
          pass: pass,
          fail: fail,
          pending: pending,
          id: uuid,
          suites_id: parentUUID,
          skipped: skipped,
          err_message: code,
        }
        testCases.push(testCase)
      }
    }
  }

  const payload = {
    buildStats,
    tests,
    testCases
  }

  return payload;
}

module.exports = {
  prepareResult
}