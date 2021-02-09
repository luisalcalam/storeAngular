export interface Cup {
    id?:       number;
    name:     string;
    volume:   string;
    material: string;
    fullname: string;
    imageurl: string;
    cupsnumber: number;
    typeId:   number;
    colorId:  number;
    type?:     Type;
    color?:    Color;
}

export interface Color {
    id?:   number;
    name: string;
    code: string;
}

export interface Type {
    id?:   number;
    name: string;
}

export interface cupSale {
    cup: Cup
    cupsnum: number,
    total: number,
    type: Type
}