/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as todosController from '../controller/todos.controller'
const router = Router()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.post('/', todosController.createTodos)
router.get('/', todosController.getTodos)
router.get('/:id', todosController.getSingleTodo)
router.put('/:id', todosController.updateTodosbyId)
router.delete('/:id', todosController.deleteTodo)

export default router
