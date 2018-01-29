import dictionary from '../config/dictionary.json'
// import _ from 'lodash'
import each from 'lodash/each'
import find from 'lodash/find'

/**
 * [dictionary 根据key获取name]
 * @param  {[type]} key  [字典key]
 * @return {[type]}      [不存在返回'',key对应的name]
 */
export const getNameByDictionaryKey = (key) => {
    let dictionaryItem = dictionary[key]
    if (dictionaryItem) {
        return dictionaryItem.name
    }
    return ''
}

/**
 * [dictionary 根据key获取object]
 * @param  {[type]} key  [字典key]
 * @return {[type]}      [不存在返回'',存在返回key对应的object]
 */
export const getObjByDictionaryKey = (key) => {
    let dictionaryItem = dictionary[key]
    if (dictionaryItem) {
        return dictionaryItem
    }
    return ''
}

/**
 * [dictionary 根据key获取list]
 * @param  {[type]} key  [字典key]
 * @return {[type]}      [不存在返回'',存在返回key对应的list]
 */
export const getListByDictionaryKey = (key) => {
    let dictionaryItem = dictionary[key]
    if (dictionaryItem && dictionaryItem.list && dictionaryItem.list.length > 0) {
        return dictionaryItem.list
    }
    return ''
}

/**
 * [dictionary 根据key获取code集合]
 * @param  {[type]} key  [字典key]
 * @return {[type]}      [不存在返回[],存在返回key对应的code集合]
 */
export const getCodelistByDictionaryKey = (key) => {
    let dictionaryItem = dictionary[key]
    if (dictionaryItem && dictionaryItem.list && dictionaryItem.list.length > 0) {
        let codeList = []
        each(dictionaryItem.list, (item) => {
            codeList.push(item.code)
        })
        return codeList
    }
    return []
}

/**
 * [dictionary 根据key获取value集合]
 * @param  {[type]} key  [字典key]
 * @return {[type]}      [不存在返回[],存在返回key对应的code集合]
 */
export const getValuelistByDictionaryKey = (key) => {
    let dictionaryItem = dictionary[key]
    if (dictionaryItem && dictionaryItem.list && dictionaryItem.list.length > 0) {
        let valueList = []
        // console.log('dictionaryItem', dictionaryItem);
        each(dictionaryItem.list, (item) => {
            valueList.push(item.name)
        })
        return valueList
    }
    return []
}

/**
 * [dictionary 根据key和code返回value]
 * @param  {[type]} key  [字典key]
 * @param  {[type]} code  [字典code]
 * @return {[type]}      [不存在返回'',存在返回code对应的value]
 */
export const getValueByDictionaryKeyAndCode = (key, code) => {
    let dictionaryItem = dictionary[key]
    if (dictionaryItem && dictionaryItem.list && dictionaryItem.list.length > 0) {
        let list = dictionaryItem.list
        let value = ''
        find(list, (item) => {
            // console.log('item', item.code, code, item.code === code)
            if (item.code === code) {
                value = item.name
                return true
            }
        })
        return value
    }
    return ''
}

/**
 * [dictionary 根据key和value返回code]
 * @param  {[type]} key  [字典key]
 * @param  {[type]} code  [字典key]
 * @return {[type]}      [不存在返回'',存在返回value对应的code]
 */
export const getCodeByDictionaryKeyAndValue = (key, value) => {
    let dictionaryItem = dictionary[key]
    if (dictionaryItem && dictionaryItem.list && dictionaryItem.list.length > 0) {
        let list = dictionaryItem.list
        let code = ''
        find(list, (item) => {
            if (item.name === value) {
                code = item.code
                return true
            }
        })
        return code
    }
    return ''
}
/**
 * [dictionary 根据数组中对象日期相等返回对应日期的value值组合]
 */
export const mergeDate = (arr) => {
    let newObj = {}
    let arr1 = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[0].quotaCode === 'XYZBXY001003' | arr[0].quotaCode === 'XYZBXY001002') {
            newObj.code = 'pressure'
        } else if (arr[0].quotaCode === 'XYZBXY003018' | arr[0].quotaCode === 'XYZBXY003017') {
            newObj.code = 'fat'
        } else if (arr[0].quotaCode === 'XYZBXY001027' | arr[0].quotaCode === 'XYZBXY001028' | arr[0].quotaCode === 'XYZBXY001026') {
            newObj.code = 'sleep'
        }
        //  console.log('原始数据', arr)
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].sysDate === arr[j].sysDate) {
                let obj = {}
                obj.quotaDate = arr[i].quotaDate
                //  obj.lowValue = arr[i].quotaValue
                //  obj.highValue = arr[j].quotaValue
                obj.highValue = arr[i].quotaValue
                obj.lowValue = arr[j].quotaValue
                arr1.push(obj)
            }
        }
    }
    newObj.dataList = arr1
    //  console.log('arr1', arr1)
    return newObj
}
/**
 * [dictionary 重新排列后台提供的指标对象数组]
 */
export const reorderArr = (allIndicatorsData) => {
    let arr = [{
        quotaCode: 'XYZBXY001006'
    }, {
        quotaCode: 'XYZBXY001007'
    }, {
        quotaCode: 'XYZBXY001004'
    }, {
        quotaCode: 'XYZBXY001001'
    }, {
        quotaCode: 'XYZBXY001008'
    }, {
        quotaCode: 'XYZBXY001005'
    }, {
        quotaCode: 'XYZBXY001013'
    }, {
        quotaCode: 'XYZBXY001010'
    }, {
        quotaCode: 'XYZBXY001025'
    }, {
        quotaCode: 'XYZBXY001003/XYZBXY001002'
    }, {
        quotaCode: 'XYZBXY003018/XYZBXY003017'
    }, {
        quotaCode: 'XYZBXY001027/XYZBXY001028/XYZBXY001026'
    }, {
        quotaCode: 'XYZBXY0010241'
    }]
    for (let i = 0; i < allIndicatorsData.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (allIndicatorsData[i].quotaCode === arr[j].quotaCode) {
                arr[j] = allIndicatorsData[i]
            }
        }
    }
    return arr.filter(function(item) {
        return item.quotaName
    })
}

