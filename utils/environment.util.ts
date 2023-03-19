import fs from "promise-fs";

export enum DataFile {
    TestData = "./data/data.#ENV#.json"
}

export class EnvironmentUtils {
    private static data = {};

    private static env() {
        return process.env.ENVIRONMENT ?? "prod";
    }

    static read<T>(dataFile: DataFile) {
        const envFilePath = dataFile.replace('#ENV#', this.env());
        const jsonData = fs.readFileSync(envFilePath, { encoding: 'utf-8' });
        const parsedData = JSON.parse(jsonData) as T;
        this.data[dataFile] = parsedData;

        return this.data[dataFile] as T;
    }
}