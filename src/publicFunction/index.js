export function getDateDiff(dateTimeStamp, citme) {
    var day = 86400000;
    var week = day * 7;
    var month = day * 30;
    var year = day * 365;
    var hours = day / 24;
    var minute = day / 1440;
    var second = day / 86400;
    var result;
    if (citme === undefined) {
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp * 1000;
    } else {
        var now = citme * 1000;
        var diffValue = dateTimeStamp * 1000 - now;
    }
    if (diffValue < 0) {
        console.log("结束日期不能小于开始日期！");
    }
    var yearC = diffValue / year;
    var monthC = diffValue / month;
    var weekC = diffValue / week;
    var dayC = diffValue / day;
    var hoursC = diffValue / hours;
    var minuteC = diffValue / minute;
    var secondC = diffValue / second;
    if (yearC >= 1) {
        result = parseInt(yearC) + "年";
    } else if (monthC >= 1) {
        result = parseInt(monthC) + "月";
    } else if (weekC >= 1) {
        result = parseInt(weekC) + "周";
    } else if (dayC >= 1) {
        result = parseInt(dayC) + "天";
    } else if (hoursC >= 1) {
        result = parseInt(hoursC) + "小时";
    } else if (minuteC >= 1) {
        result = parseInt(minuteC) + "分钟";
    } else {
        result = parseInt(secondC) + "秒";
    }
    return result;
}

//特殊方法   倒计时还有几天或者几小时结束
export function teshuGetDateDiff(dateTimeStamp, citme) {
    var day = 86400000;
    var hours = day / 24;
    var minute = day / 1440;
    var second = day / 86400;
    var result;
    if (citme === undefined) {
        var now = new Date().getTime();
        var diffValue = dateTimeStamp * 1000 - now;
    } else {
        var now = citme * 1000;
        var diffValue = dateTimeStamp * 1000 - now;
    }
    if (diffValue < 0) {
        console.log("结束日期不能小于开始日期！");
        return "已结束";
    }
    var dayC = diffValue / day;
    var hoursC = diffValue / hours;
    var minuteC = diffValue / minute;
    var secondC = diffValue / second;
    if (dayC >= 1) {
        result = parseInt(dayC) + "天";
    } else if (hoursC >= 1) {
        result = parseInt(hoursC) + "小时";
    } else if (minuteC >= 1) {
        result = parseInt(minuteC) + "分钟";
    } else {
        result = parseInt(secondC) + "秒";
    }
    return result;
}

//特殊方法   倒计时还有几天或者最新
export function teshu2GetDateDiff(dateTimeStamp, citme) {
    var day = 86400000;
    var result;
    if (citme === undefined) {
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp * 1000;
    } else {
        var now = citme * 1000;
        var diffValue = dateTimeStamp * 1000 - now;
    }
    if (diffValue < 0) {
        console.log("结束日期不能小于开始日期！");
        return "已结束";
    }
    var dayC = diffValue / day;
    if (dayC >= 1) {
        result = parseInt(dayC) + "天";
    } else {
        result = "今天";
    }
    return result;
}

//时间戳转日期
export function DateFormat(date, geshi) {
    if (date) {
        return new Date(date * 1000).Format(geshi);
    } else {
        return new Date().Format(geshi);
    }
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};

//获取指定日期的时间戳
export function toTimeStamp(e) {
    return Date.parse(new Date(e)) / 1000;
}

//获取当前时间戳
export function getTimeStamp() {
    return Date.parse(new Date()) / 1000;
}

export function distance(e) {
    //计算距离单位
    if (e >= 1000) {
        return Math.round(e / 1000) + "km";
    } else {
        return Math.round(e) + "m";
    }
}

export function priceUnit(e) {
    //金额万的单位换算
    if (e >= 10000) {
        return Math.round(e / 10000) + "万";
    } else {
        return Math.round(e);
    }
}

export function toQueryString(obj) {
    return obj
        ? Object.keys(obj)
            .sort()
            .map(function (key) {
                var val = obj[key];
                if (Array.isArray(val)) {
                    return val
                        .sort()
                        .map(function (val2) {
                            return (
                                encodeURIComponent(key) +
                                "[]=" +
                                encodeURIComponent(val2)
                            );
                        })
                        .join(",");
                }
                if (val) {
                    return (
                        encodeURIComponent(key) +
                        "=" +
                        encodeURIComponent(val)
                    );
                } else {
                    return encodeURIComponent(key) + "=";
                }
            })
            .join("&")
        : "";
}

/**
 * HTML转义
 * @return {string}
 */
export function HTMLEncode(html) {
    var temp = document.createElement("div");
    temp.textContent != null
        ? (temp.textContent = html)
        : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}

/**
 * HTML反转义
 * @return {string}
 */
export function HTMLDecode(text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}

// router search parseQuery
export function parseQuery(query) {
    var parseSearch = decodeURIComponent(query).split("?").join("");
    var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
    var obj = {};
    while (reg.exec(parseSearch)) {
        obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
}


export function encodeParseQuery(query) {
    var parseSearch = query.split("?").join("");
    var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
    var obj = {};
    while (reg.exec(parseSearch)) {
        obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
}
