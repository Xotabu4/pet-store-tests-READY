import mergeWith from 'lodash.mergewith';

/**
 * Merge provided objects into one, but concat arrays, not replace
 * 
 * Typings Bug: https://github.com/microsoft/TypeScript/issues/28010#issuecomment-713484584
 * @param args Objects to merge
 */
export const mergeWithConcat = <T>(...args: Partial<T>[]): T =>
    mergeWith({}, ...args, (objValue: any, srcValue: any) => {
        if (Array.isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    })
