import Logger from '@Shared/domain/Logger'

export class FakeLogger implements Logger {
  debug (message: string) {}

  error (message: string | Error) {}

  info (message: string) {}
}
