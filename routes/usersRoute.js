
const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
 
router.get('/', (req, res) => {
   usersController.getUsers(req, res)
})
 
router.get('/IDfilter/:passportID', (req, res) => {
   usersController.getUsers(req, res)
})
 
router.get('/amountFilter/:amount', (req, res) => {
   usersController.getUsers(req, res)
})
 
router.get('/creditFilter/:credit', (req, res) => {
   usersController.getUsers(req, res)
})
 
router.post('/', (req, res) => {
   usersController.addUser(req, res)
})
 
router.post('/deposit', (req, res) => {
   usersController.depositCash(req, res)
})
 
router.post('/updateCredit', (req, res) => {
   usersController.updateCredit(req, res)
})
 
router.post('/withdraw', (req, res) => {
   usersController.withdraw(req, res)
})
module.exports = router;
