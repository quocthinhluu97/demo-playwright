import AppSettings from "@constants/app-settings.const";
import fs from "promise-fs";

export class EnvironmentUtils {
    private static data = {};

    static read<T>(dataFile: string) {
        const envFilePath = AppSettings.ACCOUNTS.replace('#ENV#', process.env.NODE_ENV!);
        const jsonData = fs.readFileSync(envFilePath, { encoding: 'utf-8' });
        const parsedData = JSON.parse(jsonData) as T;
        this.data[dataFile] = parsedData;

        return this.data[dataFile] as T;
    }
}