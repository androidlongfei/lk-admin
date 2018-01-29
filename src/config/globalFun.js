/**
 * [install 全局函数模块]
 * @param  {[type]} Vue     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
exports.install = function (Vue, options) {
    /**
     * [showLoadMsg 显示加载框]
     * @param  {[type]} msg         [description]
     * @param  {Number} [time=2000] [延时,不设置默认为2000ms]
     * @return {[type]}             [description]
     */
    Vue.prototype.showLoadMsg = function (msg, time = 2000) {
        this.$layer.toast({
            content: msg,
            time: time
        })
    }

    /**
     * [checkEmptyStr 校验字符串是否为['',null,undefined]]
     * @param  {[type]} strValue [需要校验的字符串]
     * @return {[type]}          [当前字符串不为空直接返回,否则返回空字符串]
     */
    Vue.prototype.checkEmptyStr = function (strValue) {
        if (strValue) {
            return strValue
        }
        return ''
    }

    /**
     * [scrollYPosition 将浏览器滚动到Y抽指定位置{主要解决手机端项目在进入主页(有滚动条)后,再进入子页面，直接按返回出现空白情况的bug}]
     * @param  {[type]} position [Y抽坐标值]
     */
    Vue.prototype.scrollYPosition = function (position) {
        let scrollPosition = 0
        if (position) {
            scrollPosition = position
        }
        setTimeout(() => {
            //  console.log('scrollPosition', scrollPosition)
            document.body.scrollTop = scrollPosition
            // 兼容google chrome
            document.documentElement.scrollTop = scrollPosition
        }, 5)
    }
}
