import {Request, Response } from "express";

export interface LoggedInUser {
    id: string,
    email: string
}

export interface Context {
    req: Request
    res : Response
    user: LoggedInUser
    
}