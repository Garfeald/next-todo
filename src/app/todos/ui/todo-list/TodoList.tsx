import cls from "./TodoList.module.scss";

// 'use client'

interface ITodos {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

interface TodoListProps {
    todos: Array<ITodos>
}

export const TodoList = (props: TodoListProps) => {

    const {
        todos
    } = props;

    return (
        <div className={cls.container}>
            {todos.map((todo, index) => {
                return (
                    <div className={cls.todo} key={todo.id}>
                        <h4>
                            {`${index + 1} ${todo.title}`}
                        </h4>
                    </div>
                )
            })}
        </div>
    );
}
