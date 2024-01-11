/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, request } from 'express'
import { PrismaClient } from '@prisma/client'
import { validationResult } from 'express-validator'
const prisma = new PrismaClient()

type todos = {
    id: number
    title: string | null
    status: string | null
}
export const getData = async (body: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { title, status } = body
    console.log(title)
    console.log(status)
    /*
    const findUser = await prisma.todoo.findUnique({
        where: {
            title: title,
        },
    })

    if (findUser) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        res.
            json({ message: 'Cannot assign same email ont the database' })
    }*/
    const newUser = await prisma.todos.create({
        data: {
            title: title,
            status: status,
        },
    })
}

export const listTodos = async (): Promise<todos[]> => {
    return await prisma.todos.findMany({
        select: {
            id: true,
            title: true,
            status: true,
        },
    })
}

export const getTodosById = async (id: number): Promise<todos | null> => {
    return await prisma.todos.findUnique({
        where: {
            id: id,
        },
    })
}

export const deletetodo = async (id: number): Promise<todos> => {
    return await prisma.todos.delete({
        where: {
            id: id,
        },
    })
}

export const updateTodo = async (
    todos: Omit<todos, 'id'>,
    id: number
): Promise<todos> => {
    const { title, status } = todos
    return await prisma.todos.update({
        where: {
            id,
        },
        data: {
            status,
        },
        select: {
            id: true,
            title: true,
            status: true,
        },
    })
}
