/**
 * 上传图片
 */

import _ from 'lodash'
import storage from './storageHelp'
import {
    lktoken
} from './env'

/**
 * [converBase64Upload 将图片转化为base64进行上传]
 * @param  {[type]} uploadOptions.uploadUrl               [上传地址,必须]
 * @param  {[type]} uploadOptions.imgFileList              [需要上传的图片列表,必须]
 * @param  {String} uploadOptions.imgKey     [上传图片对应的key值,与服务端对接,必须]
 * @param  {Object} [formData={}]           [formData键值对,可以为空对象]
 * @param  {String} fileNameMd5      [文件名的MD5值(唯一),用来标识文件,可以为null]
 * @param  {[type]} [successCallback=null]  [上传成功后的回掉函数,可以为null]
 * @param  {[type]} [failedCallback=null]   [上传失败后的回掉函数,可以为null]
 * @param  {[type]} [progressCallback=null] [上传进度回掉函数,可以为null]
 * @return {[type]}                         [description]
 */
export function converBase64Upload(uploadOptions) {
    if (!uploadOptions.failedCallback) {
        uploadOptions.failedCallback = null
    }

    if (!uploadOptions.progressCallback) {
        uploadOptions.progressCallback = null
    }

    if (!uploadOptions.formData) {
        uploadOptions.formData = {}
    }

    if (!uploadOptions.imgKey) {
        uploadOptions.imgKey = 'imagess'
    }

    let myUploadOptions = {
        url: uploadOptions.uploadUrl,
        imgKey: uploadOptions.imgKey,
        imgFileList: uploadOptions.imgFileList,
        formData: uploadOptions.formData,
        successCallback: uploadOptions.successCallback,
        failedCallback: uploadOptions.failedCallback,
        progressCallback: uploadOptions.progressCallback
    }

    myUploadOptions.fileBlobList = []

    _.each(myUploadOptions.imgFileList, imgfileItem => {
        loadFile(imgfileItem.uploadFile, myUploadOptions)
    })
}

function loadFile(file, myUploadOptions) {
    let maxsize = 100 * 1024
    let reader = new FileReader()
    // 获取图片大小
    reader.onload = function () {
        let result = this.result
        let img = new Image()
        img.src = result

        // 如果图片大小小于100kb,直接获取fileBlob
        if (result.length <= maxsize) {
            let blob = getFileBlob(result, file.type)
            let fileObj = {}
            fileObj[file.name] = blob
            myUploadOptions.fileBlobList.push(fileObj)
            img = null
            checkUpload(myUploadOptions)
            return
        }
        // 图片加载完毕之后进行压缩,然后获取fileBlob
        if (img.complete) {
            callback()
        } else {
            img.onload = callback
        }

        function callback() {
            let data = compress(img)
            let blob = getFileBlob(data, file.type)
            let fileObj = {}
            fileObj[file.name] = blob
            myUploadOptions.fileBlobList.push(fileObj)
            img = null
            checkUpload(myUploadOptions)
        }
    }
    reader.readAsDataURL(file)
}

function checkUpload(myUploadOptions) {
    // 所有图片都转化为了 blob ,可以开始上传了
    if (myUploadOptions.fileBlobList.length === myUploadOptions.imgFileList.length) {
        let xhr = new XMLHttpRequest()
        let formData = getFormData()
        _.each(myUploadOptions.fileBlobList, fileObj => {
            // 文件
            //  console.log('fileBlob---------------', myUploadOptions)
            _.each(fileObj, (value, key) => {
                console.log(key, value)
                formData.append(myUploadOptions.imgKey, value, key)
            })
        })
        _.each(myUploadOptions.formData, (value, key) => {
            // 字符串
            formData.append(key, value)
        })

        xhr.open('post', myUploadOptions.url, true)
        if (storage.lktoken) {
            // 让每个请求携带token, 根据后台配置
            xhr.setRequestHeader('lktoken', storage.lktoken)
        } else {
            // 测试
            xhr.setRequestHeader('lktoken', lktoken)
        }
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
                    let jsonData = JSON.parse(xhr.responseText)
                    // console.log('jsonData', jsonData)
                    if (myUploadOptions.successCallback !== null) {
                        myUploadOptions.successCallback(jsonData, myUploadOptions.imgFileList)
                    }
                } else {
                    if (myUploadOptions.failedCallback !== null) {
                        myUploadOptions.failedCallback(myUploadOptions.imgFileList)
                    }
                }
            }
        }
        // 文件上传进度,貌似ios报错
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

        xhr.send(formData)
    }
}

function getFileBlob(fileBaseStr, fileType) {
    let text = window.atob(fileBaseStr.split(',')[1])
    let buffer = new Uint8Array(text.length)
    for (var i = 0; i < text.length; i++) {
        buffer[i] = text.charCodeAt(i)
    }
    let blob = getBlob([buffer], fileType)
    return blob
}

// 使用canvas对大图片进行压缩
function compress(img) {
    // 用于压缩图片的canvas
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let tCanvas = document.createElement('canvas')
    let tctx = tCanvas.getContext('2d')
    let width = img.width
    let height = img.height
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
    } else {
        ratio = 1
    }
    canvas.width = width
    canvas.height = height
    //        铺底色
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // 如果图片像素大于100万则使用瓦片绘制
    var count
    if ((count = width * height / 1000000) > 1) {
        // 计算要分成多少块瓦片
        count = ~~(Math.sqrt(count) + 1)
        // 计算每块瓦片的宽和高
        var nw = ~~(width / count)
        var nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height)
    }
    // 进行最小压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.1)
    // let initSize = img.src.length
    // console.log('压缩前：' + initSize);
    // console.log('压缩后：' + ndata.length);
    // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    return ndata
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
        })
        return bb.getBlob(format)
    }
}

/**
 * 获取formdata
 */
function getFormData() {
    var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
        ~navigator.vendor.indexOf('Google') &&
        !~navigator.userAgent.indexOf('Chrome') &&
        navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534
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
        parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"')
        if (value instanceof Blob) {
            parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n')
            parts.push(value)
        } else {
            parts.push('\r\n\r\n' + value)
        }
        parts.push('\r\n')
    }
    // Override XHR send()
    XMLHttpRequest.prototype.send = function (val) {
        let fr
        let data
        let oXHR = this
        if (val === o) {
            // Append the final boundary string
            parts.push('--' + boundary + '--\r\n')
            // Create the blob
            data = getBlob(parts)
            // Set up and read the blob into an array to be sent
            fr = new FileReader()
            fr.onload = function () {
                oldSend.call(oXHR, fr.result)
            }
            fr.onerror = function (err) {
                throw err
            }
            fr.readAsArrayBuffer(data)
            // Set the multipart content type and boudary
            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary)
            XMLHttpRequest.prototype.send = oldSend
        } else {
            oldSend.call(this, val)
        }
    }
}
