export default class AppSettings {
    static readonly BASE_URL = process.env.BASE_URL!;
    static readonly DATA = process.cwd() + '/data';
    static readonly ACCOUNTS = this.DATA + '/accounts.#ENV#.json';

}