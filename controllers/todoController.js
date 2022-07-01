const Todo = require('../models/todo');

// create new task
module.exports.post_task = async(req, res) => {
  const { title, description } = req.body;
  try {
    const todo = await Todo.create({ title, description })
    await todo.save()
    res.status(201).json({todo, message:"you sucessfully a to-do task!"});
  } catch (err) {
    console.log(err)
        return  res.status(400).json({
        status:"Failed",
        message:err.message
    });

  }
}

// fetch all tasks
module.exports.task_get = async (req, res)=>{
    try {
      const tasks = await Todo.find({});
      if(!tasks){
        res.status(404).json({
          message:'No user found!'
        })
        return;
      }
      res.status(200).json(tasks)
    } catch (err){
      console.log(err)
        return  res.status(500).json({
          status:"Failed",
          message:err.message
        });
    }     
}


// edit single task
module.exports.task_patch = async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description'];
    const isValidOperation = updates.every((updates) => {
      return allowedUpdates.includes(updates)
    })
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid update' })
    }
  
    try {
    //   console.log(updates)
      const todo = await Todo.findOne({ _id: req.params.id });
  
      updates.forEach((update) => {
        todo[update] = req.body[update]
      })
     
      await todo.save()
      res.send('succesfully updated task details!✔')
  
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: "Failed",
        message: err.message
      });
    }
  }

//   delete a task
module.exports.delete_task = async(req, res) => {
    try{
      const task = await Todo.findOneAndDelete({ _id:req.params.id})
  
      if(!task) {
        return res.status(404).send()
      }
  
      res.json({task, message: "Task deleted sucessfully!"});
    } catch (e) {
      res.status(500).send(e)
      console.log(e)
    }
  }