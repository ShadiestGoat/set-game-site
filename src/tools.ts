import { isSafari } from "react-device-detect"
import { useRef, useEffect, useCallback } from 'preact/hooks';

export function rand(min: number, max: number): number {
    return Math.floor(Math.random()*(max-min+1)+min)
}
export function timeFormat(time: Date | number, ms = true) {
    if (typeof time == "number") time = new Date(isSafari ? time + 60 * 60 * 1000 : time)
    else if (isSafari) time = new Date(time.getTime() + 60 * 60 * 1000)

    let mss = ""
    if (ms) {
        const _mss = time.getMilliseconds()
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
    return `${time.getHours() -1 ? ((time.getHours() -1).toString().length == 1 ? `0${time.getHours() -1}:` : `${time.getHours() -1  }:`) : ''}${time.getMinutes() ? (time.getMinutes().toString().length == 1 ? `0${time.getMinutes()}` : time.getMinutes()) : '00'}:${time.getSeconds().toString().length == 1 ? `0${time.getSeconds()}` : time.getSeconds()}${ms ? mss : ''}`
}

export function useGlobalListener<K extends keyof WindowEventMap>(type:K, handler:(e:WindowEventMap[K]) => void, capture = false, passive = false) {
    const cur = useRef(handler);
    cur.current = handler;
    const proxy = useCallback((e:WindowEventMap[K]) => cur.current(e), []);
    useEffect(() => {
      const opts = passive ? { passive, capture } : capture;
      addEventListener(type, proxy, opts);
      return () => removeEventListener(type, proxy, opts);
    }, [type, capture, passive, proxy]);
}