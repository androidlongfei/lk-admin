<template>
<div class="addExternalappraisalReport">
    <!--<x-header style="background-color: #B81C26" :left-options="{backText: ''}">添加外部评估报告</x-header>-->
    <custom-header :headerData="headerData"></custom-header>
    <group title="体检报告所属人" label-width="5.5em" label-margin-right="1em" label-align="left">
        <x-input readonly="readonly" title="姓名" name="username" placeholder="" :value="this.user.userName"></x-input>
        <x-input readonly="readonly" title="性别" name="sex" placeholder="" :value="this.user.gender"></x-input>
    </group>
    <group label-width="5.5em" label-margin-right="1em" label-align="left" gutter="0" title="体检报告记录">
        <datetime v-model="uploadData.uploadTime.value" :end-date="endDate" format="YYYY-MM-DD HH:mm" @on-change="onChange" :title="uploadData.uploadTime.title"></datetime>
        <x-input title="数据来源" text-align="right" v-model="uploadData.source" placeholder="请输入数据来源" require></x-input>
        <x-input title="地点" text-align="right" v-model="uploadData.place" placeholder="请输入地点" require></x-input>
        <x-input title="名称" text-align="right" v-model="uploadData.name" placeholder="请输入名称" require></x-input>
        <cell title="图片" :border-intent="false"></cell>
        <div class="container">
            <!--    照片添加    -->
            <div class="z_photo">
                <div class="photo">
                    <div v-for="(imgItem, index) in this.uploadData.uploadImgs" :key="index" class="z_addImg">
                        <img @click="imgClick(imgItem,index)" :src="imgItem.url" :alt="imgItem.uploadFile.name" />
                        <span style="position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);color:red;">{{imgItem.progress}}</span>
                    </div>

                </div>
                <div class="z_file">
                    <!-- <input ref="choose" type="file" accept="image/gif,image/jpeg" :change="this.imgChange()" multiple> -->
                    <input type="file" multiple name="uploadFieldName" @change="filesChange($event.target.files)" accept="image/gif,image/jpeg">
                </div>

            </div>

            <!--遮罩层-->
            <div v-show="this.showDelFileDialog" class="z_mask">
                <!--弹出框-->
                <div class="z_alert">
                    <p>确定要删除这张图片吗？</p>
                    <p>
                        <span @click="cancelDelFile()" class="z_cancel">取消</span>
                        <span @click="sureDelFile()" class="z_sure">确定</span>
                    </p>
                </div>
            </div>
        </div>
    </group>

    <div class="save">
        <x-button @click.native="saveData()" type="primary">保存</x-button>
    </div>
</div>
</template>

<script>
import {
    Group,
    Cell,
    XInput,
    XButton,
    Datetime
} from 'vux'
import CustomHeader from '../../../../src/components/CustomHeader'
import storage from '../../../config/storageHelp'
import moment from 'moment'
import each from 'lodash/each'
import find from 'lodash/find'
import includes from 'lodash/includes'
//  import md5 from 'md5'
import {
    converBase64Upload
} from '../../../config/formdataUploadImgList'
import {
    baseUrl
} from '../../../config/env'
const UPLOAD_STATUS = {
    INIT: 0,
    UPLOADING: 1,
    SUCCESS: 2,
    FAILED: 3
}
export default {

    components: {
        Group,
        Cell,
        XInput,
        XButton,
        Datetime,
        CustomHeader
    },

    data() {
        return {
            headerData: {
                headerTitle: '添加体检报告',
                routerTitle: '',
                routerPath: ''
            },
            endDate: moment().format('YYYY-MM-DD'),
            user: {
                userName: '',
                gender: ''
            },
            uploadData: {
                uploadTime: {
                    value: moment().format('YYYY-MM-DD HH:ss'),
                    title: '时间'
                },
                place: '',
                name: '',
                source: '',
                uploadImgs: []
            },
            showDelFileDialog: false,
            needDelFileIndex: -1,
            uploadFileLoading: false
        }
    },

    mounted() {
        this.user.userName = storage.userName
        this.user.gender = storage.gender
        //  console.log('storage.userName', storage.userName)
    },

    watch: {
        uploadFileLoading(loading) {
            if (loading) {
                this.$layer.loading('保存中...')
            } else {
                this.$layer.close()
            }
        }
    },

    methods: {
        onChange(time) {
            // console.log('time', time)
        },

        saveData() {
            //  this.uploadFileLoading = true
            let formData = {
                'date': this.uploadData.uploadTime.value,
                'recordSource': this.uploadData.source,
                'address': this.uploadData.place,
                'name': this.uploadData.name,
                'reportType': '1'
            }
            //  console.log('formData是', formData)
            let imgFileList = this.uploadData.uploadImgs
            // console.log('上传前', imgFileList)
            console.log('上传前', imgFileList, imgFileList.length === 0)
            // if (imgFileList.length === 0) {
            //     console.log('图片为空')
            //     this.showLoadMsg('请选择图片')
            //     return
            // }
            if (!this.uploadData.source) {
                //  console.log('数据来源为空')
                this.showLoadMsg('请输入数据来源')
                return false
            }
            if (!this.uploadData.place) {
                //  console.log('地点为空')
                this.showLoadMsg('请输入地点 ')
                return false
            }
            if (!this.uploadData.name) {
                console.log('名称为空')
                this.showLoadMsg('请输入名称 ')
                return false
            }
            if (!imgFileList.length) {
                //  console.log('图片为空')
                this.showLoadMsg('请选择图片')
                return false
            }
            this.uploadFileLoading = true
            let uploadOptons = {
                uploadUrl: baseUrl + '/lkj/report/insertOutReport.do',
                imgKey: 'images',
                formData: formData,
                imgFileList: imgFileList,
                successCallback: (result, fileList) => {
                    //  console.log('保存状态', result)
                    let fileStatus
                    let msg
                    if (result.status && result.status === '1') {
                        fileStatus = UPLOAD_STATUS.SUCCESS
                        msg = '保存成功'
                    } else {
                        fileStatus = UPLOAD_STATUS.FAILED
                        msg = '保存失败'
                    }
                    each(fileList, file => {
                        file.fileUploadStatus = fileStatus
                    })
                    // console.log('file list', this.uploadData.uploadImgs)
                    this.uploadFileLoading = false
                    setTimeout(() => {
                        this.showLoadMsg(msg)
                        if (fileStatus === UPLOAD_STATUS.SUCCESS) {
                            this.$router.go(-1)
                        }
                    }, 50)
                },
                failedCallback: (fileList) => {
                    each(fileList, file => {
                        file.fileUploadStatus = UPLOAD_STATUS.FAILED
                    })
                    this.uploadFileLoading = false
                    setTimeout(() => {
                        this.showLoadMsg('保存失败')
                    }, 100)
                }
            }
            converBase64Upload(uploadOptons)
        },

        filesChange(fileList) {
            // console.log('fileList', fileList)
            each(fileList, file => {
                this.uploadData.uploadImgs.push(this.assemblyFileObj(file))
            })
        },

        assemblyFileObj(file) {
            let uploadFileObj = {
                uploadFile: file,
                url: window.URL.createObjectURL(file),
                fileNameMd5: file.name + new Date().getTime(),
                fileUploadStatus: UPLOAD_STATUS.INIT
            }
            return uploadFileObj
        },

        checkFinishStatus() {
            // 检测图片数组是否全部上传完毕
            let allFinish = true
            find(this.uploadData.uploadImgs, imgObj => {
                if (!includes([UPLOAD_STATUS.SUCCESS], imgObj.fileUploadStatus)) {
                    allFinish = false
                    return true
                }
            })
            return allFinish
        },

        imgClick(imgItem, index) {
            // console.log('imgItem', index)
            this.needDelFileIndex = index
            this.showDelFileDialog = true
        },

        cancelDelFile() {
            this.needDelFileIndex = -1
            this.showDelFileDialog = false
        },

        sureDelFile() {
            if (this.needDelFileIndex !== -1) {
                this.uploadData.uploadImgs.splice(this.needDelFileIndex, 1)
            }
            this.showDelFileDialog = false
        },

        showLoadMsg(msg, time = 2000) {
            this.$layer.toast({
                content: msg,
                time: time
            })
        }
    }

}
</script>

<style lang="scss" scoped>
.addExternalappraisalReport {
    // padding-bottom: 1.5em;
    background-color: #EFEFF4;
    height: 400px;
    .card-padding {
        padding: 10px;
    }
    .save {
        margin: 1.5em 1em 2em;
    }
    .container {
        width: 100%;
        overflow: auto;
        .z_photo {
            padding: 0 20px;
            overflow: auto;
            clear: both;
            margin: 1rem auto;
        }

        .z_photo img {
            width: 60px;
            height: 60px;
        }

        .z_addImg {
            float: left;
            position: relative;
            margin-right: 0.2rem;
            margin-top: 0.2rem;
        }

        .z_file {
            width: 60px;
            height: 60px;
            cursor: pointer;
            background: url("../../../images/z_add.png") no-repeat;
            background-size: 100% 100%;
            float: left;
            margin-top: 0.2rem;
        }

        .z_file input::-webkit-file-upload-button {
            width: 60px;
            height: 60px;
            border: none;
            position: absolute;
            outline: 0;
            opacity: 0;
        }

        .z_file input#file {
            display: block;
            width: auto;
            border: 0;
            vertical-align: middle;
        }

        /*遮罩层*/

        .z_mask {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .5);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            // display: none;
        }

        .z_alert {
            width: 300px;
            height: 150px;
            border-radius: 15px;
            background: #fff;
            font-size: 16px;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -150px;
            margin-top: -120px;
        }
        .z_alert p:nth-child(1) {
            line-height: 100px;
        }
        .z_alert p:nth-child(2) span {
            display: inline-block;
            width: 49%;
            height: 50px;
            line-height: 50px;
            float: left;
            border-top: 1px solid #ddd;
        }

        .z_cancel {
            border-right: 1px solid #ddd;
        }
    }
}
</style>
