import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import Todo from "@/models/todo";
import { v4 } from "uuid";

connect()

function getIdFromPathname(s: String) {
    let parts = s.split("/");
    return parts[parts.length - 1];
}

export async function GET(request: NextRequest) {
    try {
        // console.log(request.nextUrl.pathname);
        const path = request.nextUrl.pathname;
        const id = getIdFromPathname(path);

        const todo = await Todo.findOne({id})

        console.log(todo);
        // console.log(id);
        // const todos= await Todo.find({})
        // console.log(todos);

        return NextResponse.json({ msg: "Found all todos", success: true})
    } catch (error) {
        return NextResponse.json({ msg: "Issue happened!"}, { status: 500 })
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const path = request.nextUrl.pathname;
        const id = getIdFromPathname(path);

        await Todo.deleteOne({id});

        return NextResponse.json({ msg: "Todo Deleted", success: true});
    } catch (error) {
        return NextResponse.json({ msg: "Issue happened!"}, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const path = request.nextUrl.pathname;
        const id = getIdFromPathname(path);

        const reqBody = await request.json()
        const {desc, completed} = reqBody;

        await Todo.updateOne({id}, {$set: { desc, completed}});
        return NextResponse.json({ msg: "Todo edited", success: true});
    } catch (error) {
        return NextResponse.json({ msg: "Issue happened!"}, { status: 500 }) 
    }
}