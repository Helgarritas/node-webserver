import { Router } from 'express';
import { TodoController } from './controller';

export class TodoRoutes {

    static get routes() {
        const router = Router();
        const todoController = new TodoController();

        router.get('/', (req, res) => {todoController.getTodos( req, res )} )
        router.get('/:id', (req, res) => {todoController.getTodosById( req, res )} )
        router.post('/', (req, res) => {todoController.createTodo( req, res )} )
        router.put('/:id', (req, res) => {todoController.updateTodos( req, res )} )
        router.delete('/:id', (req, res) => {todoController.deleteTodo( req, res )} )

        return router;
    }

}