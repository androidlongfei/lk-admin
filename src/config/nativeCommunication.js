// 与Android和ios通信


/**
 * [sendStrDataToNative 给android和ios发送字符串数据]
 * @param  {[type]} str [给native发送的字符串]
 */
export const sendStrDataToNative = (str) => {
    if (!str) {
        console.log('sendStrDataToNative data is null');
        return
    }
    // 给ios发送消息
    if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.closeCurrentPage.postMessage(str)
    }
    // 给android发送消息
    if (window.Android) {
        window.Android.closeCurrentPage(str)
    }
}

/**
 * [receiveStrDataFromAndroid 接收android或者ios发送的字符串数据]
 * @param  {[type]} str [description]
 */
export const receiveStrDataFromAndroid = (str) => {
    console.log('receiveStrDataFromAndroid', str)
}
