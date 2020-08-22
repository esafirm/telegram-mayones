import { QuizSession } from '../../stores/types';
export function sessionId(session: QuizSession) {
  return `${session.roomId}${session.session}`;
}

export const Promisify = {
  ignoreError<T>(promise: Promise<T>): Promise<T | null> {
    return new Promise(resolver => {
      promise.then(result => resolver(result as T)).catch(() => resolver(null));
    });
  },
};
