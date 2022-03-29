export function MovingVerification(
  target: unknown,
  methodName: string,
  descriptor: PropertyDescriptor,
) {
  let instancing = true;
  function handleRFunctionReturn(
    self: any,
    functionReturn: Promise<any> | unknown,
  ) {
    if (functionReturn instanceof Promise) {
      return functionReturn.then(function (value) {
        self.readyToAction = true;
        return value;
      });
    }
    self.readyToAction = true;
    return functionReturn;
  }

  return {
    get() {
      function wrapperFn(this: Record<string, unknown>, ...args: any[]): any {
        if (instancing) {
          this.readyToAction = true;
          instancing = false;
        }
        const className = this.constructor.name;

        if (!this.readyToAction) {
          const ERROR_MESSAGE = `The component in: ${className} is not ready to action`;
          throw new Error(ERROR_MESSAGE);
        }

        this.readyToAction = false;
        const functionReturn = descriptor.value.apply(this, args);

        return handleRFunctionReturn(this, functionReturn);
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
