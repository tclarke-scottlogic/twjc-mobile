import { DateTime } from "luxon";
import { developer as configFile } from "../config.json";

const developer = {
  enableConsoleLogging: true,
  enableRemoteLogging: true,
  logLevel: "Info",
  ...configFile
};

const LogLevel = {
  Off: "Off",
  Trace: "Trace",
  Debug: "Debug",
  Info: "Info",
  Performance: "Performance",
  Dev: "Developer",
  Warn: "Warning",
  Error: "Error",
  Fatal: "Fatal"
};

const LogThresholds = {
  [LogLevel.Trace]: 1,
  [LogLevel.Debug]: 2,
  [LogLevel.Info]: 5,
  [LogLevel.Performance]: 7,
  [LogLevel.Dev]: 8,
  [LogLevel.Warn]: 10,
  [LogLevel.Error]: 11,
  [LogLevel.Fatal]: 12,
  [LogLevel.Off]: 100
};

export const LoggerEvents = {
  DeveloperLog: "DeveloperLog"
};

class Logger {
  constructor() {
    this.messages = [];
    this.subscriberContext = "<None>";
    this.middlewareContext = "ReduxMiddleware";
  }

  isNotSubscriber(context) {
    return (
      this.subscriberContext !== context && this.middlewareContext !== context
    );
  }

  _log(context, logLevel, message, additional) {
    const configThreshold = LogThresholds[developer.logLevel];
    const logThreshold = LogThresholds[logLevel];
    const isAboveThreshold = logThreshold >= configThreshold;

    const logEntry = {
      created: DateTime.utc(),
      context,
      logLevel,
      message,
      additional
    };

    if (developer.enableConsoleLogging && isAboveThreshold) {
      const contextString = context || "Global";
      if (additional.length > 0) {
        console.log(
          contextString + ":",
          logLevel + ":",
          message,
          JSON.stringify(additional)
        );
      } else {
        console.log(contextString + ":", logLevel + ":", message);
      }
    }

    this.messages.push(logEntry);
    if (
      developer.enableRemoteLogging &&
      isAboveThreshold &&
      this.isNotSubscriber(context)
    ) {
      // Call callbacks
    }
  }

  fatal(message, ...additional) {
    this._log(null, LogLevel.Fatal, message, additional);
  }
  error(message, ...additional) {
    this._log(null, LogLevel.Error, message, additional);
  }
  warn(message, ...additional) {
    this._log(null, LogLevel.Warn, message, additional);
  }
  info(message, ...additional) {
    this._log(null, LogLevel.Info, message, additional);
  }
  debug(message, ...additional) {
    this._log(null, LogLevel.Debug, message, additional);
  }
  trace(message, ...additional) {
    this._log(null, LogLevel.Trace, message, additional);
  }
  performance(message, ...additional) {
    this._log(null, LogLevel.Performance, message, additional);
  }
  dev(message, ...additional) {
    this._log(null, LogLevel.Dev, message, additional);
  }

  forContext(context) {
    return {
      fatal: (m, ...a) => this._log(context, LogLevel.Fatal, m, a),
      error: (m, ...a) => this._log(context, LogLevel.Error, m, a),
      warn: (m, ...a) => this._log(context, LogLevel.Warn, m, a),
      info: (m, ...a) => this._log(context, LogLevel.Info, m, a),
      debug: (m, ...a) => this._log(context, LogLevel.Debug, m, a),
      trace: (m, ...a) => this._log(context, LogLevel.Trace, m, a),
      performance: (m, ...a) => this._log(context, LogLevel.Performance, m, a),
      dev: (m, ...a) => this._log(context, LogLevel.Dev, m, a)
    };
  }
}

export const logger = new Logger();
