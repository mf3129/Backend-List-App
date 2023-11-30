const updateTask = (req, res) => {
    const { toDoList, newTaskName, taskInfo: {completed} } = req.body;
    const { taskId } = req.params;

    try {
        if(!taskId) {
            return res.status(400).json("Task ID not provided");
        }

        res.send(toDoList?.map(todo => todo.identifier === taskId ? {...todo, task: newTaskName, completed, isEditing: !todo.isEditing} : todo));
    } catch(error) {
        return res.status(400).json(`Unable to update task. : ${error}`);
    }
}

const addTask = (req, res) => {
    const { todos, newTask: {identifier, task, completed, isEditing} } = req.body;

    try {
        if (!identifier || !task) {
            return res.status(400).json('No identifier or task name provided');
        }

        let fullTasks = [
            ...todos,
            {
                identifier,
                task,
                completed,
                isEditing
            }
        ]

        return res.send(fullTasks);
    } catch(error) {
        return res.status(400).json('Unable to add task');
    }
}

const deleteTask = (req, res) => {
    const { taskId } = req.params;
    const { todoList } = req.body;

    try {
        if(!taskId) {
            return res.status(400).json("Task ID not provided");
        }

        res.send(todoList?.filter(task => task.identifier !== taskId));
    } catch(error) {
        return res.status(400).json(`Unable to delete task. : ${error}`);
    }
}


module.exports = {
    updateTask,
    addTask,
    deleteTask
}
