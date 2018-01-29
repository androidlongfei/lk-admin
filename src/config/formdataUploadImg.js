/**
 * 上传图片
 */

import _ from 'lodash'

/**
 * [converBase64Upload 将图片转化为base64进行上传]
 * @param  {[type]} uploadUrl               [上传地址,必须]
 * @param  {[type]} uploadFile              [需要上传的图片文件,必须]
 * @param  {String} [imgKey='imagess']      [上传图片对应的key值,与服务端对接,必须]
 * @param  {Object} [formData={}]           [formData键值对,可以为空对象]
 * @param  {String} fileNameMd5      [文件名的MD5值(唯一),用来标识文件,可以为null]
 * @param  {[type]} [successCallback=null]  [上传成功后的回掉函数,可以为null]
 * @param  {[type]} [failedCallback=null]   [上传失败后的回掉函数,可以为null]
 * @param  {[type]} [progressCallback=null] [上传进度回掉函数,可以为null]
 * @return {[type]}                         [description]
 */
export function converBase64Upload(uploadUrl, uploadFile,
    imgKey = 'imagess', fileNameMd5 = null, formData = {}, successCallback = null,
    failedCallback = null, progressCallback = null) {
    if (!/\/(?:jpeg|png|gif)/i.test(uploadFile.type)) {
        console.log('文件格式错误,必须是图片', uploadFile)
        return
    }
    let maxsize = 100 * 1024
    let reader = new FileReader();
    // 获取图片大小
    reader.onload = function () {
        let result = this.result;
        let img = new Image();
        img.src = result
        let uploadOptions = {
            url: uploadUrl,
            fileBaseStr: '',
            fileType: uploadFile.type,
            imgKey: imgKey,
            data: formData,
            fileNameMd5: fileNameMd5,
            successCallback: successCallback,
            failedCallback: failedCallback,
            progressCallback: progressCallback
        }
        // 如果图片大小小于100kb，则直接上传
        if (result.length <= maxsize) {
            img = null
            uploadOptions.fileBaseStr = result
            uploadImage(uploadOptions)
            return
        }
        // 图片加载完毕之后进行压缩，然后上传
        if (img.complete) {
            callback()
        } else {
            img.onload = callback;
        }

        function callback() {
            let data = compress(img)
            uploadOptions.fileBaseStr = data
            uploadImage(uploadOptions)
            img = null;
        }
    };
    reader.readAsDataURL(uploadFile);
}

// 使用canvas对大图片进行压缩
function compress(img) {
    // 用于压缩图片的canvas
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d');
    let tCanvas = document.createElement('canvas')
    let tctx = tCanvas.getContext('2d')
    let width = img.width
    let height = img.height
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    //        铺底色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 如果图片像素大于100万则使用瓦片绘制
    var count;
    if ((count = width * height / 1000000) > 1) {
        // 计算要分成多少块瓦片
        count = ~~(Math.sqrt(count) + 1)
        // 计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }
    // 进行最小压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.1)
    // let initSize = img.src.length
    // console.log('压缩前：' + initSize);
    // console.log('压缩后：' + ndata.length);
    // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
}


// 图片上传，将base64的图片转成二进制对象，塞进formdata上传
function uploadImage(options) {
    let text = window.atob(options.fileBaseStr.split(',')[1])
    let buffer = new Uint8Array(text.length);
    let pecent = 0
    for (var i = 0; i < text.length; i++) {
        buffer[i] = text.charCodeAt(i);
    }
    let blob = getBlob([buffer], options.fileType)
    let xhr = new XMLHttpRequest()
    let formdata = getFormData()
    formdata.append(options.imgKey, blob);
    _.each(options.data, (value, key) => {
        formdata.append(key, value)
    })

    xhr.open('post', options.url, true)
    xhr.onreadystatechange = function () {
        // console.log('xhr.responseText', xhr.status, xhr.readyState)
        // readyState 状态
        // 0: 请求未初始化
        // 1: 服务器连接已建立
        // 2: 请求已接收
        // 3: 请求处理中
        // 4: 请求已完成，且响应已就绪
        // alert('readyState:' + xhr.readyState + ' status:' + xhr.status + ' responseText:' + xhr.responseText)
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // console.log('xhr.responseText', xhr.responseText)
                let jsonData = JSON.parse(xhr.responseText);
                // console.log('jsonData', jsonData)
                if (options.successCallback !== null) {
                    options.successCallback(jsonData, options.fileNameMd5)
                }
            } else {
                if (options.failedCallback !== null) {
                    options.failedCallback(pecent, options.fileNameMd5)
                }
            }
        }
    };
    // 数据发送进度，前50%展示该进度
    // xhr.upload.addEventListener('progress', function (e) {
    //     // console.log('progress e', e)
    //     if (e.lengthComputable) {
    //         pecent = ~~(100 * e.loaded / e.total) / 2
    //         alert('pecent:' + pecent)
    //         if (options.progressCallback !== null) {
    //             options.progressCallback(pecent, options.fileNameMd5)
    //         }
    //     }
    // }, false)

    xhr.send(formdata);
}

/**
 * 获取blob对象的兼容性写法
 * @param buffer
 * @param format
 * @returns {*}
 */
function getBlob(buffer, format) {
    try {
        return new Blob(buffer, {
            type: format
        })
    } catch (e) {
        // alert('upload error')
        let bb = new Blob(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder)
        buffer.forEach(function (buf) {
            bb.append(buf)
        });
        return bb.getBlob(format);
    }
}

/**
 * 获取formdata
 */
function getFormData() {
    var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
        ~navigator.vendor.indexOf('Google') &&
        !~navigator.userAgent.indexOf('Chrome') &&
        navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
    return isNeedShim ? new FormDataShim() : new FormData()
}

/**
 * formdata 补丁, 给不支持formdata上传blob的android机打补丁
 * @constructor
 */
function FormDataShim() {
    // console.warn('using formdata shim');
    let o = this
    let parts = []
    let boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36)
    let oldSend = XMLHttpRequest.prototype.send
    this.append = function (name, value, filename) {
        parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
        if (value instanceof Blob) {
            parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
            parts.push(value);
        } else {
            parts.push('\r\n\r\n' + value);
        }
        parts.push('\r\n');
    };
    // Override XHR send()
    XMLHttpRequest.prototype.send = function (val) {
        let fr
        let data
        let oXHR = this
        if (val === o) {
            // Append the final boundary string
            parts.push('--' + boundary + '--\r\n');
            // Create the blob
            data = getBlob(parts);
            // Set up and read the blob into an array to be sent
            fr = new FileReader();
            fr.onload = function () {
                oldSend.call(oXHR, fr.result);
            };
            fr.onerror = function (err) {
                throw err;
            };
            fr.readAsArrayBuffer(data);
            // Set the multipart content type and boudary
            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
            XMLHttpRequest.prototype.send = oldSend;
        } else {
            oldSend.call(this, val);
        }
    };
}
