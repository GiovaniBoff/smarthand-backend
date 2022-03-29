import BoardIntegrated from '../boardIntegrated';

export function UsingBoard(
  target: BoardIntegrated,
  methodName: string,
  descriptor: PropertyDescriptor,
) {
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
      if (Number.isNaN(board.getPin)) {
        const message = `Pin not set on: ${className}`;
        throw new Error(message);
      }
    }
  }

  return {
    get() {
      async function wrapperFn(this: BoardIntegrated, ...args: any[]) {
        const className = this.constructor.name;
        verifyBoardUsability(this, className);

        return descriptor.value.apply(this, args);
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
