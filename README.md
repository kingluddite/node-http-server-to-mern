# Response choices
* We use just one route as an example but this applies to all controllers
* **BEST PRACTICE** If you change your responses for every route it will be very confusing for whomever is using your API
* You can set up your own CUSTOM reponses but if you want the current front end to work properly, the reponses HAVE TO BE EXACTLY the same because that is what the app is expecting
```
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    // we send back the object
    // inside the object there is a property by the name of "tasks"
    // res.status(200).json({ tasks: tasks })
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
```

* We use this `res.status(200).json({ tasks })`

## But we can use alternate responses
* There is no right way but whichever way you use make sure to be consistent

### We could add the amount of tasks
```
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    // lets add our tasks and another property with the number of tasks
    res.status(200).json({ tasks, amount: tasks.length })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
```

## We could send a flag
```
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    // lets add a success flag and our tasks and another property with the number of tasks
    res.status(200).json({ success:true, data:{tasks, nbHits:tasks.length} })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
```

## Alternate flag

```
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    // lets add a success flag and our tasks and another property with the number of tasks
    res.status(200).json({ status: "success", data:{tasks, nbHits:tasks.length} })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
```

### Possible con to setting up status or successes or data
* Just because of the frontend
* Usually on the frontend we are dealing with async reponses we usually are using a try/catch and because of that the status or success flags to be redundant
  * Because if I am successful on frontend then our frontend try catch code will run regardless and if there is some kind of error you will have your code in the catch block
    * Why not prefering to use `data` because if you are using axios or fetch it will right away return a `data` property and this means if you set the controller response to have a `data` returned in the object, then on the front end you will have `data` and inside that `data` object you will have another `data` object so your path will be `data: { data: {tasks} }` which is redundant

* So front end code like this:

```
 // MORE CODE

const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks')
 
 // MORE CODE
```

* And we would need to change it to this:

```
 // MORE CODE

const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      // SEE THIS IS REDUNDANT!
      data: { data: {tasks} },
    } = await axios.get('/api/v1/tasks')
 
 // MORE CODE
```

