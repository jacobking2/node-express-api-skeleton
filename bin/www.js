#!/usr/bin/env node

'use strict';

/* eslint-disable global-require */
function initialize() {
  function getLogFunctionFactory(config) {
    const debug = require('debug');
    debug.enable(config.debug);

    return require('../src/web/services/logFunctionFactory');
  }

  function monitorAndLog(server, port, config) {
    const logFunctionFactory = getLogFunctionFactory(config);
    const onError = require('./onError');
    server.on('error', onError);

    const logStart = require('./logStart');
    logStart(port, config.nodeEnv, logFunctionFactory);
  }

  const app = require('../src/web/app');
  const config = require('../src/web/config');
  const port = parseInt(config.desiredPort, 10);
  const server = app.listen(port);

  monitorAndLog(server, port, config);
}

initialize();
