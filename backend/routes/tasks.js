const express = require('express')
const router = express.Router()

const { getAllTasks } = require('../controllers/tasks')

router.route('/').get(getAllTasks)

// two ways

// add get and add controllers one by one
// router.get('/', getPeople)
// router.post('/', createPerson);
// router.post('/postman', createPersonPostman)
// router.put('/:id', updatePerson)
// router.delete('/:id', deletePerson)

// or change them together (less typing)
// router.route('/').get(getPeople).post(createPerson)
// router.route('/postman').post(createPersonPostman)
// router.route('/:id').put(updatePerson).delete(deletePerson)

module.exports = router
