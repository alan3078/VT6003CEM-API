interface Logger {
    debug(message: string): void;
    info(message: string): void;
    warning(message: string): void;
    error(message: string): void;
}

interface Clearable {
    clear(): void;
}
 
class ConsoleLogger implements Logger {
    debug(message: string) {
      console.info(`[DEBUG] ${message}`);
    }
    info(message: string) {
      console.info(message);
    }
    warning(message: string) {
      console.warn(message);
    }
    error(message: string) {
      console.error(message);
    }
}

class ConsoleLogger2 implements Logger, Clearable {
    clear() {
      console.clear();
    }
    debug(message: string) {
      console.info(`[DEBUG] ${message}`);
    }
    info(message: string) {
      console.info(message);
    }
    warning(message: string) {
      console.warn(message);
    }
    error(message: string) {
      console.error(message);
    }
}

const cl = new ConsoleLogger();
cl.debug("Bug 1");
cl.info("Info 1");
cl.warning("Warning 1");
cl.error("Error 1");

const cl2 = new ConsoleLogger2();
cl2.clear();
cl2.debug("Bug 2");
cl2.info("Info 2");
cl2.warning("Warning 2");
cl2.error("Error 2");
