export class Paths {
    static readonly ROOT: string = 'data';
    static readonly FILE_DATA = [this.ROOT, 'data.#ENV#.json'].join('/');
}