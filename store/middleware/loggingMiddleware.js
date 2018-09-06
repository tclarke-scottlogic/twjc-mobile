import { logger as loggerBase } from "../../services/logger";

const logger = loggerBase.forContext(loggerBase.middlewareContext);

export const loggingMiddleware = store => next => action => {
  logger.debug("Action:", action);
  next(action);
};
