import { error } from "console";
import { create } from "domain";
import { Request, Response } from "express";
import { todo } from "node:test";

const todos = [
    { id: 1, text: 'buy milk', createAt: new Date() },
    { id: 2, text: 'buy bread', createAt: new Date() },
    { id: 3, text: 'buy butter', createAt: new Date() },
]

export class TodoController {
    
    public getTodos( req: Request, res: Response ) {
        res.json( todos )
    }

    getTodosById( req: Request, res: Response ) {
        const param = +req.params.id; 
        
        const id = todos.find( obj => obj.id === param );

        (param)
            ? res.status(200).json( id ) 
            : res.status(404).json( {error: 'No se encontro el id proporcionado'} )
    }

    createTodo( req: Request, res: Response ) {
        const body = req.body;

        const { text, id, createAt, } = body;

        if( !body ){ res.status(400).json({ error: 'No se encontro ningun elmento en Body'}) };
        
        const newTodo = {
            id: todos.length + 1,
            text: text,
            createAt: createAt
        }

        const addNewTodo = todos.push( newTodo );

        res.json( todos );
    }

    updateTodos( req: Request, res: Response ) {
        const body = req.body;

        const param = + req.params.id;
        if( isNaN(param) ) return res.status(400).json({ error: `Element id ${param} not found` })

        const todo = todos.find((obj) => obj.id === param)
        if( !todo ) return res.status(404).json({ error: 'Todo not found'})
        
        const { text, createAt } = body;

        todo.text = text || todo.text;

        createAt === null
            ? todo.createAt = createAt
            : todo.createAt = new Date( createAt || todo.createAt )
    }

        deleteTodo( req: Request, res: Response ) {
            const body = req.body;
            
            const param = + req.params.id;

            if (isNaN(param)) return res.status(400).json({ error: 'Param not is a number' });

            const todo = todos.find( obj => obj.id === param );
            if( !todo ) return res.status(404).json({ error: 'todo not found' });

            todos.splice( todos.indexOf(todo), 1 );

            res.json( todo );
        }   

}