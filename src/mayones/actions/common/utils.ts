import { QuizSession } from '../../stores/types';

export function sessionId(session: QuizSession) {
  return parseInt(`${Math.abs(session.roomId)}${session.session}`);
}
