export type setCard = `${Num}${Shape}${Color}${Fill}`
export type Num = '1' | '2' | '3'
export type Shape = 'w' | 'r' | 'o'
export type Color = 'r' | 'p' | 'g'
export type Fill = 'f' | 'e' | 's'


export const cardType = [
    ['1', '2', '3'],
    ['w', 'r', 'o'],
    ['r', 'p', 'g'],
    ['f', 'e', 's']
]
export const colorMap:{[key:string]:string} = {
    'r': '#bd0000',
    'p': '#761068',
    'g': '#00aa00'
}

export type boardRow<Type = setCard> = [Type, Type, Type, Type, Type?, Type?]

export type setBoard<Type = setCard> = [
    boardRow<Type>,
    boardRow<Type>,
    boardRow<Type>
]

export const FullDeck:setCard[] = [
    "1wrf", "1wre", "1wrs", "1wpf", "1wpe", "1wps",
    "1wgf", "1wge", "1wgs", "1rrf", "1rre", "1rrs",
    "1rpf", "1rpe", "1rps", "1rgf", "1rge", "1rgs",
    "1orf", "1ore", "1ors", "1opf", "1ope", "1ops",
    "1ogf", "1oge", "1ogs", "2wrf", "2wre", "2wrs",
    "2wpf", "2wpe", "2wps", "2wgf", "2wge", "2wgs",
    "2rrf", "2rre", "2rrs", "2rpf", "2rpe", "2rps",
    "2rgf", "2rge", "2rgs", "2orf", "2ore", "2ors",
    "2opf", "2ope", "2ops", "2ogf", "2oge", "2ogs",
    "3wrf", "3wre", "3wrs", "3wpf", "3wpe", "3wps",
    "3wgf", "3wge", "3wgs", "3rrf", "3rre", "3rrs",
    "3rpf", "3rpe", "3rps", "3rgf", "3rge", "3rgs",
    "3orf", "3ore", "3ors", "3opf", "3ope", "3ops",
    "3ogf", "3oge", "3ogs"
]

export const transformations:{[key:string]:string} = {
    '1w1':'translate(-115,-243) scale(2.1)',
    '2w1':'translate(-115,-295) scale(2.1)',
    '2w2':'translate(-115,-195) scale(2.1)',
    '3w1':'translate(-115,-343) scale(2.1)',
    '3w2':'translate(-115,-243) scale(2.1)',
    '3w3':'translate(-115,-143) scale(2.1)',
    '1r1':'translate(0,40)',
    '2r1':'translate(0,-10)',
    '2r2':'translate(0,90)',
    '3r1':'translate(0,-62)',
    '3r2':'translate(0,40)',
    '3r3':'translate(0,140)',
    '1o1':'translate(15,98)',
    '2o1':'translate(15,43)',
    '2o2':'translate(15,143)',
    '3o1':'translate(15,2)',
    '3o2':'translate(15,98)',
    '3o3':'translate(15,194)',
}
export function arrayThing(num:string) {
    const defs:{[key:string]:string[]} = {
        '1': ['1'],
        '2': ['1', '2'],
        '3': ['1', '2', '3'],
        '4': ['1', '2', '3', '4'],
        '5': ['1', '2', '3', '4', '5']
    }
    return defs[num]
}

export const keyMap: {[key: string]: [number, number]} = {
    'q': [0, 0],
    'w': [0, 1],
    'e': [0, 2],
    'a': [1, 0],
    's': [1, 1],
    'd': [1, 2],
    'z': [2, 0],
    'x': [2, 1],
    'c': [2, 2]
}