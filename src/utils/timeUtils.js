import moment from 'moment'

/**
 * [formatTime 按指定的格式格式化当前时间]
 * @param  {[type]} format [格式，例如'YYYY-MM-DD HH:ss']
 * @return {[type]}        [description]
 */
export const formatTime = (format) => {
    return moment().format(format)
}
