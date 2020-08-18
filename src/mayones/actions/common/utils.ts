import { QuizSession } from '../../stores/types';

export function sessionId(session: QuizSession) {
  return session.roomId + session.session;
}
