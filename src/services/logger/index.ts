const debugger_mode = process.env.DEBUGGER_MODE;

function getHour12H() {
  const now = new Date();
  let hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  if (hour > 12) {
    hour -= 12;
  }

  const formatedHour = hour.toString().padStart(2, '0');
  const formatedMinutes = minutes.toString().padStart(2, '0');
  const formatedSeconds = seconds.toString().padStart(2, '0');
  const horaActual = `${formatedHour}:${formatedMinutes}:${formatedSeconds}`;
  return horaActual;
}

const unixTime = (): string => getHour12H();

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
