/**
 * storageHelp用来将数据存储到本地
 */

const propsPrefix = '$storeData$'

// 默认键值
const props = ['lktoken', 'userName', 'gender']

class StrorageHelp {
    constructor() {
        console.log('create obj')
        const self = this
        props.forEach((name) => {
            self[name] = load(name)
        })
    }
    save() {
        let self = this
        // let storage = this.rememberMe ? localStorage : sessionStorage
        let storage = localStorage
        props.forEach((name) => {
            saveItem(storage, name, self[name])
        })
    }

    clearStorage() {
        let self = this
        props.forEach((name) => {
            self[name] = null
            saveItem(sessionStorage, name, null)
            saveItem(localStorage, name, null)
        })
    }

    setRemeberUsername(username = '') {
        console.log('setRemeberUsername', username)
        localStorage.remeberUsername = username
    }

    getRemeberUsername() {
        return localStorage.remeberUsername
    }
}

function load(name) {
    var key = propsPrefix + name
    return localStorage[key] || sessionStorage[key] || null
}

function saveItem(storage, name, value) {
    try {
        const key = propsPrefix + name
        if (value === null) value = ''
        storage[key] = value
    } catch (err) {
        console.log('Cannot access local/session storage:', err);
    }
}

export default new StrorageHelp()
