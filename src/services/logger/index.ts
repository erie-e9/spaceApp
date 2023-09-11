const debugger_mode = process.env.DEBUGGER_MODE;

const unixTime = (): number => new Date().getTime() / 1000;

export const Logger = {
  error: (message?: unknown, ...optionalParams: unknown[]): void => {
    if (debugger_mode) {
      console.error('\n\n', unixTime(), message, optionalParams);
    }
  },
  log: (message?: unknown, ...optionalParams: unknown[]): void => {
    if (debugger_mode) {
      console.log('\n\n', unixTime(), message, optionalParams);
    }
  },
  warn: (message?: unknown, ...optionalParams: unknown[]): void => {
    if (debugger_mode) {
      console.warn('\n\n', unixTime(), message, optionalParams);
    }
  },
};

export default Logger;
