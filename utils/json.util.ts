import fs from 'promise-fs';
import path from 'path';

export class JsonUtils {
    private static _data = {};

    static read<T>(dataFile: string) {
        if (this._data?.[dataFile] == null) {
            const jsonData = fs.readFileSync(path.join(process.cwd(), dataFile), { encoding: 'utf-8' });
            const parsedData = JSON.parse(jsonData) as T;
            this._data[dataFile] = parsedData;
        }

        return this._data[dataFile] as T;
    }
}