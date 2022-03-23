# Setup routes
* This is the compact way to write routes
```
const express = require('express')
const router = express.Router()

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs')

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router

```

* This is the verbose way to write routes (either way is fine - your choice, but choose one and use it consistently)

```
const express = require('express')
const router = express.Router()

const { login, register } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)

module.exports = router

```



