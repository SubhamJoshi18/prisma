/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextFunction, Request, Response } from 'express'
import * as service from '../service/todo.servic'
import { body, validationResult } from 'express-validator'
export const createTodos = (
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    const response = service.getData(req.body)
    res.json(response)
}

export const getTodos = async (request: Request, res: Response) => {
    try {
        const todo = await service.listTodos()
        res.json(todo)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.log(err)
    }
}

export const getSingleTodo = async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10)
    try {
        const get = await service.getTodosById(id)
        if (get) {
            return response.status(200).json(get)
        }
        return response.status(404).json('Not found')
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
}

export const updateTodosbyId = async (request: Request, response: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() })
    }
    const id: number = parseInt(request.params.id, 10)
    try {
        const todo = request.body
        const updatedTodos = await service.updateTodo(todo, id)
        return response.status(200).json(updatedTodos)
    } catch (error: any) {
        return response.status(400).json({ error })
    }
}

export const deleteTodo = async (request: Request, response: Response) => {
    try {
        const id: number = parseInt(request.params.id, 10)
        await service.deletetodo(id)
        return response.status(200).json({ message: 'Succesfully deleted' })
    } catch (error: any) {
        return response.status(404).json({ error })
    }
}
