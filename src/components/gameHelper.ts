export type setCard = `${Num}${Shape}${Color}${Fill}`
export type Num = '1' | '2' | '3'
export type Shape = 'w' | 'r' | 'o'
export type Color = 'r' | 'p' | 'g'
export type Fill = 'f' | 'e' | 's'

export const colorMap:{[key:string]:string} = {
    r: '#bd0000',
    p: '#6e1f64', //todo make new color
    g: '#00aa00'
}

export const FullDeck:setCard[] = [
    "1wrf", "1wre", "1wrs", "1wpf", "1wpe", "1wps", "1wgf", "1wge", "1wgs",
    "1rrf", "1rre", "1rrs", "1rpf", "1rpe", "1rps", "1rgf", "1rge", "1rgs",
    "1orf", "1ore", "1ors", "1opf", "1ope", "1ops", "1ogf", "1oge", "1ogs",
    "2wrf", "2wre", "2wrs", "2wpf", "2wpe", "2wps", "2wgf", "2wge", "2wgs",
    "2rrf", "2rre", "2rrs", "2rpf", "2rpe", "2rps", "2rgf", "2rge", "2rgs",
    "2orf", "2ore", "2ors", "2opf", "2ope", "2ops", "2ogf", "2oge", "2ogs",
    "3wrf", "3wre", "3wrs", "3wpf", "3wpe", "3wps", "3wgf", "3wge", "3wgs",
    "3rrf", "3rre", "3rrs", "3rpf", "3rpe", "3rps", "3rgf", "3rge", "3rgs",
    "3orf", "3ore", "3ors", "3opf", "3ope", "3ops", "3ogf", "3oge", "3ogs"
]

export const keyMap: {[key: string]: [number, number]} = {
    q: [0, 0],
    w: [0, 1],
    e: [0, 2],
    a: [1, 0],
    s: [1, 1],
    d: [1, 2],
    z: [2, 0],
    x: [2, 1],
    c: [2, 2]
}

export type Split = {
    name: string,
    best: number,
    fin: number
}
export const splitsE:Split[] = [
    {
        name: "3 Sets",
        best: 11166,
        fin: 3,
    },
    {
        name: "6 Sets",
        best: 38052,
        fin: 6
    },
    {
        name: "8 Sets",
        best: 13191,
        fin: 8
    },
    {
        name: "11 Sets",
        best: 25269,
        fin: 11
    },
    {
        name: "14 Sets",
        best: 30636,
        fin: 14
    },
    {
        name: "17 Sets",
        best: 23853,
        fin: 17
    },
    {
        name: "20 Sets",
        best: 26134,
        fin: 20
    },
    {
        name: "23 Sets",
        best: 13171,
        fin: 23
    },
    {
        name: "Game finished",
        best: 14000,
        fin: -1
    }
]

export const splitsB:Split[] = [
    {
        name: "3 Sets",
        best: 21166,
        fin: 3,
    },
    {
        name: "6 Sets",
        best: 48052,
        fin: 6
    },
    {
        name: "8 Sets",
        best: 23191,
        fin: 8
    },
    {
        name: "11 Sets",
        best: 30269,
        fin: 11
    },
    {
        name: "14 Sets",
        best: 35636,
        fin: 14
    },
    {
        name: "17 Sets",
        best: 29853,
        fin: 17
    },
    {
        name: "20 Sets",
        best: 31134,
        fin: 20
    },
    {
        name: "23 Sets",
        best: 21171,
        fin: 23
    },
    {
        name: "Game finished",
        best: 21000,
        fin: -1
    }
]
