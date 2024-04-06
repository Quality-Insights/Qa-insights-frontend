const { randomUUID } = require("crypto");

function prepareResult(cypressResult) {
  const { stats, results } = cypressResult;
  
  const buildId = randomUUID();  // Using a random uuid as buildId (buildId not found in logs.)
  const buildStats = {
    build_id: buildId,
    startdatetime: stats.start,
    duration: stats.duration,
    suitescount: stats.suites,
    tescount: stats.tests,
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
    const { suites } = result;

    for(const suite of suites) {
      const { uuid, title, duration, tests: rawTests } = suite;

      const test = {
        test_id: uuid,
        name: title,
        duration: duration,
        build_id: buildId
      }
      tests.push(test);

      for(const rawTest of rawTests) {
        const { title, fullTitle, timedOut, duration, state, speed, pass, fail, pending, uuid, parentUUID, skipped, code } = rawTest;

        const testCase = {
          title: title,
          full_title: fullTitle,
          timedout: timedOut,
          duration: duration,
          state: state,
          speed: speed,
          is_pass: pass,
          fail: fail,
          pending: pending,
          testcase_id: uuid,
          test_id: parentUUID,
          is_skipped: skipped,
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