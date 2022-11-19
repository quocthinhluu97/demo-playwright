export class ArrayUtils {
    public static isNullOrEmpty<T>(array: T[] | Array<T>) {
        return !array || array.length === 0;
    }
}