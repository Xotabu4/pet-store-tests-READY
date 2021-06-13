import { allure } from 'allure-mocha/dist/MochaAllureReporter'

export function AllureStep(message: string) {
  return (target: Object, property: string, descriptor: PropertyDescriptor) => {
    const originalFunction = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return allure.step(
        message,
        async () => {
          allure.createAttachment(
            `${message} ARGUMENTS`,
            JSON.stringify(args, null, 2),
            'application/json' as any
          )
          const result = await originalFunction.apply(this, args)
          allure.createAttachment(
            `${message} RESULT`,
            JSON.stringify(result, null, 2),
            'application/json' as any
          )
          return result
        }
      );
    };

    return descriptor;
  };
}