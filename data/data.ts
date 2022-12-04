export type Data = {
    baseUrl: string;
    accounts: Account[];
}

export interface Account {
    username: string;
    password: string;
    storageState: string;
}