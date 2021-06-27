import { isSafari } from "react-device-detect"

export function rand(min:number, max:number):number {
    return Math.floor(Math.random()*(max-min+1)+min)
}
export function timeFormat(time:Date | number, ms:boolean = true) {
    if (typeof time == "number") time = new Date(isSafari ? time + 60 * 60 * 1000 : time)
    else if (isSafari) time = new Date(time.getTime() + 60 * 60 * 1000)

    let mss = ""
    if (ms) {
        let _mss = time.getMilliseconds()
        switch(_mss.toString().length.toString()) {
            case "1":
                mss = `:00${_mss}`
                break
            case "2":
                mss = `:0${_mss}`
                break
            case "3":
                mss = `:${_mss}`
                break
            }
        }
    return `${time.getHours() -1 ? ((time.getHours() -1).toString().length == 1 ? `0${time.getHours() -1}:` : time.getHours() -1) + ':' : ''}${time.getMinutes() ? (time.getMinutes().toString().length == 1 ? `0${time.getMinutes()}` : time.getMinutes()) : '00'}:${time.getSeconds().toString().length == 1 ? `0${time.getSeconds()}` : time.getSeconds()}${ms ? mss : ''}`
}