import { addMedicalRecord } from '../../../../service/medicalRecord'
let store = {
    actions: {
        ADDMEDICALRECORD ({dispatch, commit, state}, data) {
            addMedicalRecord(data.payload).then(res => {
                console.log(res, 'ADDMEDICALRECORD datas')
            }).catch((ex) => {
                console.log(ex)
            })
        }
    }
}
export default store
