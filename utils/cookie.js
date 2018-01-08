export function getCookie(key) {
    const cookies = document.cookie.split("; ");
    // 遍历 cookies 数组中的每个元素
    for (let i = 0, len = cookies.length; i < len; i++) {
        // cookies[i] : 当前遍历到的元素，代表的是 "key=value" 意思的字符串，
        // 将字符串以 = 号分割返回的数组中第一个元素表示 key，
        // 第二个元素表示 value
        let cookie = cookies[i].split("=");
        // 判断是否是要查找的 key，对查找的 key 、value 都要做解码操作
        if (decodeURIComponent(cookie[0]) === key) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return null
}

export function setCookie(key, value, options) {
    // 设置 options 默认为空对象
    options = options || {}
    // key = value，对象 key，value 编码
    let cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    // 失效时间
    if ((typeof options.expires) !== "undefined") { // 有配置失效时间
        if (typeof options.expires === "number") { // 失效时间为数字
            const days = options.expires,
                t = options.expires = new Date()
            t.setDate(t.getDate() + days)
        }
        cookie += ";expires=" + options.expires.toUTCString()
    }
    // 路径
    if (typeof options.path !== "undefined")
        cookie += ";path=" + options.path
    // 域名
    if (typeof options.domain !== "undefined")
        cookie += ";domain=" + options.domain
    // 安全连接
    if (options.secure)
        cookie += ";secure"

    // 保存
    document.cookie = cookie
}


export function removeCookie(key, options) {
    options = options || {}
    options.expires = -1; // 将失效时间设置为 1 天前
    setCookie(key, "", options)
}