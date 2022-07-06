export class Producto {
    private _id?: number;
    private _nombre: string;
    private _precio: number;

    constructor(nombre: string, precio: number) {
        this._nombre = nombre;
        this._precio = precio;
    }

    get id(): number {
        if(this._id === undefined){
            return -1;
        }
        return this._id;
    }

    get nombre(): string {
        return this.nombre;
    }

    set nombre(nombre: string) {
        this._nombre = nombre;
    }

    get precio(): number {
        return this._precio;
    }

    set precio(precio: number) {
        if (precio < 0) {
            throw new Error;
        }
        this._precio = precio;
    }


}
