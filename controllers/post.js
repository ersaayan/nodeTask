const PostSchema = require('../models/post');
const addTodo = async (req, res) => {
    try {
        const todoData = req.body;
        todoData.author = req.userId;
        const newTodo = await PostSchema.create(todoData);
        if (!newTodo) {
            return res.status(400).json({message: "Todo could not be created"});
        }
        res.status(200).json({
            newTodo
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};
const getTodos = async (req, res) => {
    try {
        const todos = await PostSchema.find({author: req.userId});
        res.status(200).json({
            todos
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};
const getAllTodos = async (req, res) => {
    try {
        const todos = await PostSchema.find();
        res.status(200).json(todos);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};
const getTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await PostSchema.findById(id);
        if (!todo) {
            return res.status(400).json({message: "Todo does not exist"});
        }
        if (todo.author.toString() !== req.userId) {
            return res.status(400).json({message: "Not authorized"});
        }
        res.status(200).json({
            todo
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};
const updateTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const updateTodo = await PostSchema.findByIdAndUpdate(id, req.body, {new: true});
        if (!updateTodo) {
            return res.status(400).json({message: "Todo does not exist"});
        }
        if (updateTodo.author.toString() !== req.userId) {
            return res.status(400).json({message: "Not authorized"});
        }
        res.status(200).json({
            updateTodo,
            message: "Todo updated successfully"
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};
const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await PostSchema.findByIdAndDelete(id);
        if (!deleteTodo) {
            return res.status(400).json({message: "Todo does not exist"});
        }
        if (deleteTodo.author.toString() !== req.userId) {
            return res.status(400).json({message: "Not authorized"});
        }
        res.status(200).json({
            message: "Todo deleted successfully"
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const searchTodo = async (req, res) => {
    const { title, tag } = req.query;
    let query = {author: req.userId};

    if (tag) {
        // title ve content alanlarında "tag" kelimesini ara
        const regex = new RegExp(tag, 'i');
        query.$or = [
            { title: regex },
            { content: regex }
        ];
    } else if (title) {
        // Sadece title alanında "title" kelimesini ara
        query.title = new RegExp(title, 'i');
    }

    try {
        const todos = await PostSchema.find(query);
        if(todos.length === 0) {
            return res.status(400).json({message: "Todo not found"});
        }
        res.status(200).json({
            todos
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const completedTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await PostSchema.findById(id);
        if (!todo) {
            return res.status(400).json({message: "Todo does not exist"});
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json({
            todo,
            message: "Todo updated successfully"
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
module.exports = {
    addTodo,
    getTodos,
    getAllTodos,
    getTodo,
    updateTodo,
    deleteTodo,
    searchTodo,
    completedTodo
}
