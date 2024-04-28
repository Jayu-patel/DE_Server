const express = require('express')
const router = express.Router()
const mail = require('../controllers/mail')

const hospital = require('../controllers/hospitalControllers')

//hospital
router.route('/addPatient').post(hospital.addpatient)
router.route('/pRegister').post(hospital.register)
router.route('/pLogin').post(hospital.login)
router.route('/getMail').post(mail.registerMail)

router.route('/plusHospital').put(hospital.plusHospital)
router.route('/book').put(hospital.bookHospital)
router.route('/updatePass').put(hospital.updatePassword)

router.route('/getHospitals').get(hospital.searchHospital)
router.route('/getPatients/:hospital').get(hospital.searchPatient)
router.route('/findUser/:username').get(hospital.findUser)
router.route('/patients/:username').get(hospital.userDatas)
router.route('/getAllHospitals').get(hospital.getAllHospital)


module.exports = router