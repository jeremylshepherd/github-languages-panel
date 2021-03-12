/**
 * Sorts the the key value pairs in an object by descending order of values.
 * @param obj { [key: string]: number }
 * @returns Sorted object
 */

export default function sortObject(obj : { [key: string]: number }) : { [key: string]: number } {
    const sorted = Object.fromEntries(
        Object.entries(obj).sort(([,a],[,b]) => b - a)
    );
    return sorted;
}