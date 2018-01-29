<template>
<div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="title-container">
            <h3 class="title">{{$t('login.title')}}</h3>
            <lang-select class="set-language"></lang-select>
        </div>
        <el-form-item prop="username">
            <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
        </el-form-item>

        <el-form-item prop="password">
            <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
            <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
            <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
        </el-form-item>

        <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

        <div class="tips">
            <span>{{$t('login.username')}} : admin</span>
            <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
        </div>
        <div class="tips">
            <span style="margin-right:18px;">{{$t('login.username')}} : editor</span>
            <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button>
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
        {{$t('login.thirdpartyTips')}}
    </el-dialog>

</div>
</template>

<script>
import { isvalidUsername } from '../../utils/validate'
import LangSelect from './component/LangSelect'
import { LOGIN_BY_USERNAME } from './module/mutations_types'

export default {
    components: { LangSelect },
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!isvalidUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: 'admin',
                password: '1111111'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',
            loading: false,
            showDialog: false
        }
    },
    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch(LOGIN_BY_USERNAME, this.loginForm).then((res) => {
                        this.loading = false
                        let loginRequestStatus = this.$store.getters.loginRequestStatus
                        if (!loginRequestStatus.isError) {
                            // 登录成功
                            let currentUserInfo = this.$store.getters.currentUserInfo
                            console.log('登录成功,当前用户信息', currentUserInfo);
                            // this.$router.push({ path: '/' })
                        } else {
                            // 登录失败
                            console.log('登录失败', loginRequestStatus.message)
                        }
                    }).catch(() => {
                        this.loading = false
                        console.log('登录错误')
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    },
    mounted() {

    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            background: transparent;
            border: 0;
            -webkit-appearance: none;
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 520px;
        padding: 35px 35px 15px;
        margin: 120px auto;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
            font-size: 20px;
        }
    }
    .title-container {
        position: relative;
        .title {
            font-size: 26px;
            font-weight: 400;
            color: $light_gray;
            margin: 0 auto 40px;
            text-align: center;
            font-weight: bold;
        }
        .set-language {
            color: #fff;
            position: absolute;
            top: 5px;
            right: 0;
        }
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
    .thirdparty-button {
        position: absolute;
        right: 35px;
        bottom: 28px;
    }
}
</style>
