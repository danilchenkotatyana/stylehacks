const util = require('util');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp } = format;
const _ = require('underscore');
const { MESSAGE, SPLAT } = require('triple-beam');

const formatter = (meta_formatter) => {
  return {
    transform: (info) => {
      let prefix = prefixes.join('.');
      if (prefix) {
        prefix = `[${prefix}]`;
      }
      info[MESSAGE] = `${info.level}: ${prefix} ${info.message}`;
      if (info[SPLAT]) {
        for (const m of info[SPLAT]) {
          if (_.isObject(m)) {
            info[MESSAGE] += ' ' + meta_formatter(m);
          } else {
            info[MESSAGE] += ' ' + m;
          }
        }
      }
      return info;
    }
  }
}

let formatter_instance;

if (process.env.log_format == 'true') {
  formatter_instance = combine(
    timestamp(),
    formatter((m) => {
      return util.inspect(m, false, 10)
    })
  );
} else {
  formatter_instance = combine(
    formatter((m) => {
      return util.inspect(m, {
        showHidden: false,
        depth: 10,
        breakLength: Infinity
      })
    })
  );
}
const prefixes = [];
const impl = createLogger({
  level: process.env.log_level,
  format: formatter_instance,
  transports: [
    new transports.Console(),
    new transports.File({ filename: process.env.log_file })
  ]
});
module.exports = {
  info: function (message, ...meta) {
    impl.info(message, ...meta);
  },
  warn: function (message, ...meta) {
    impl.warn(message, ...meta);
  },
  error: function (message, ...meta) {
    impl.error(message, ...meta);
  },
  debug: function (message, ...meta) {
    impl.debug(message, ...meta);
  },
  push: function (prefix) {
    prefixes.push(prefix);
  },
  pop: function () {
    prefixes.pop();
  }
}