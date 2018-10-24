export class SpyExtensions {
    static returnValuesAs(values: any[]): () => object {
        let returnIndex = 0;
        return () => {
            const value = values[returnIndex];
            returnIndex++;
            return value;
           };
    }
}
