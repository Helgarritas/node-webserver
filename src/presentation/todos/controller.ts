import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todo/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todo/update-todo.dto";

export class TodoController {
    
    //* GetTodos
    public async getTodos( req: Request, res: Response ) {
        const todos = await prisma.todo.findMany()

        res.json( todos )
    }

    //* GetTodoById
    async getTodosById( req: Request, res: Response ) {
        const param = +req.params.id; 
        
        const todo = await prisma.todo.findUnique({
            where: {id: param}
        })

        res.json(todo)
    }

    //* CreateTodo
    async createTodo( req: Request, res: Response ) {
        const body = req.body;
        
        const [ error, createTodoDto ] = CreateTodoDto.create(body);
        if(error) return res.status(400).json({error: 'you need a camp to text'})

        
        const todo = await prisma.todo.create({
            data: {
                text: createTodoDto?.text!,
                createAt: new Date()
            } 
        })


        res.json(todo);
    }

    //* UpdateTodo
    async updateTodos( req: Request, res: Response ) {
        const body = req.body;

        const id = + req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: `Element id ${id} not found` })

        const [error, updateTodoDto] = UpdateTodoDto.update({...body, id});
        if( error ) res.status(400).json({error})

        const updateTodo = await prisma.todo.update({
            where: {id: id},
            data: updateTodoDto!.values
        })

        res.json(updateTodo)
    }

    //* DeleteTodo
    async deleteTodo( req: Request, res: Response ) {
        const body = req.body;
        
        const param = + req.params.id;
        if (isNaN(param)) return res.status(400).json({ error: 'Param not is a number' });

        const todo = await prisma.todo.delete({
            where: {id: param}
        })

        res.json(todo)
    }   

}

