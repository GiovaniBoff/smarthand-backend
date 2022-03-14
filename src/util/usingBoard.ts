import BoardIntegrated from './boardIntegrated.util';

export function UsingBoard(
  target: BoardIntegrated,
  methodName: string,
  descriptor: PropertyDescriptor,
) {
  return {
    get() {
      function wrapperFn(this: BoardIntegrated, ...args: any[]) {
        const className = this.constructor.name;
        verifyBoardUsability(this, className);

        descriptor.value.apply(this, args);
      }

      Object.defineProperty(this, methodName, {
        value: wrapperFn,
        configurable: true,
        writable: true,
      });

      return wrapperFn;
    },
  };
}

function verifyBoardUsability(board: BoardIntegrated, className: string) {
  verifyBoardIsWorking();
  verifyPin();
  function verifyBoardIsWorking() {
    if (!board.isBoardReady()) {
      const message = `Board not connected on ${className}`;
      throw new Error(message);
    }
  }

  function verifyPin() {
    if (!board.getPin) {
      const message = `Pin not set on: ${className}`;
      throw new Error(message);
    }
  }
}
