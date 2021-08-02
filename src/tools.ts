import { useRef, useEffect, useCallback } from 'preact/hooks';

export function rand(min: number, max: number): number {
    return Math.floor(Math.random()*(max-min+1)+min)
}
export function timeFormat(time: number, ms = true) {
    const t = new Date(time)
    let mss = ""
    if (ms) {
        const _mss = t.getUTCMilliseconds()
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
    
    return `${t.getUTCHours() ? `0${t.getUTCHours()}:` : ``}${t.getUTCMinutes() ? (t.getUTCMinutes().toString().length == 1 ? `0${t.getUTCMinutes()}` : t.getUTCMinutes()) : '00'}:${t.getUTCSeconds().toString().length == 1 ? `0${t.getUTCSeconds()}` : t.getUTCSeconds()}${ms ? mss : ''}`
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

export function newUTCTime() {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);   
}
