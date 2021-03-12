export default function getObjectTotals(obj : { [key: string]: number }, arr : { [key: string]: number }[]) : { [key: string]: number } {
        arr.forEach(o => {
            let keys : string[] = Object.keys(o);
            keys.forEach(key => {
                key in obj ? obj[key] += o[key] : obj[key] = o[key];
            });
        });
        return obj;
}