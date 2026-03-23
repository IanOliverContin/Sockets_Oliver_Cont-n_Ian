import { CommandNotRegisteredError } from '@Shared/domain/CommandBus/CommandNotRegisteredError'
import { CommandHandlerInformation } from '@Shared/infrastructure/CommandBus/handler/CommandHandlerInformation'
import { CommandBus } from '@Shared/infrastructure/CommandBus/CommandBus'
import { UnhandledCommand } from '@Tests/Contexts/Shared/infrastructure/CommandBus/UnhandledCommand'
import { HandledCommand } from '@Tests/Contexts/Shared/infrastructure/CommandBus/HandledCommand'
import { MyCommandHandler } from '@Tests/Contexts/Shared/infrastructure/CommandBus/MyCommandHandler'
import { Command } from '@Shared/domain/CommandBus/Command'

let commandHandlerInformation: CommandHandlerInformation
let command: Command
let commandBus: CommandBus

describe('CommandBus', () => {
  it('throws CommandNotRegisteredError when dispatching a command without handler', async () => {
    command = new UnhandledCommand()
    commandHandlerInformation = new CommandHandlerInformation([])
    commandBus = new CommandBus(commandHandlerInformation)

    await expect(commandBus.dispatch(command)).rejects.toThrow(CommandNotRegisteredError)
  })

  it('dispatches a command when handler is registered', async () => {
    const myCommandHandler = new MyCommandHandler()

    command = new HandledCommand()
    commandHandlerInformation = new CommandHandlerInformation([myCommandHandler])
    commandBus = new CommandBus(commandHandlerInformation)

    await commandBus.dispatch(command)
  })
})
