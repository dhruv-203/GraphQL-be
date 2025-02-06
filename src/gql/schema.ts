//graphql
export const schema = `#graphql
type Query{
    todos(filterBy: FilterBy, sortBy: SortBy): [Todo!]!   
    todoById(id:ID):Todo!
}

type Mutation{
    createTodo(title: String!, description: String!, due_date: String!, status: Status!, priority: Priority!): ResponseMessage!
    updateTodo(id: ID!, title: String!, description: String!, due_date: String!, status: Status!, priority: Priority!): ResponseMessage!
    deleteTodo(id: ID!): ResponseMessage!
}

type ResponseMessage{
    message: String!
    success: Boolean!
}



input SortBy{
    created_at: SortOrder
    due_date: SortOrder
}

enum SortOrder{
    ASC
    DESC
}

input FilterBy{
    status: Status
    priority: Priority
}


enum Status{
    in_progress
    completed
    pending
}

enum Priority{
    LOW
    MEDIUM    
    HIGH
}

type Todo{
    id: ID!
    title: String!
    description: String!
    due_date : String!
    created_at: String!
    status: Status!
    priority: Priority!
}



`;
