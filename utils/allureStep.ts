import { allure } from 'allure-mocha/dist/MochaAllureReporter'

export function step(message: string) {
  return (target: any, property: any, descriptor: any) => {
    const originalFunction = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const decorated = () => allure.step(
        message,
        async () => originalFunction.apply(this, args)
      );
      return decorated();
    };

    return descriptor;
  };
}