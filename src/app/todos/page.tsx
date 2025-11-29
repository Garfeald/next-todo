import { CurrentTime } from "./ui/current-time/CurrentTime";
import { TodoList } from "./ui/todo-list/TodoList";

interface ITodos {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export default async function Todos() {

    try {
        const todos = await fetch('https://jsonplaceholder.typicode.com/todos', {
            next: {
                revalidate: 10, // ревалидация каждые 60 секунд
                tags: ['todos'] // для инвалидации по тегу
            }
        }).then(res => res.json()) as Array<ITodos>

        return <div>
            <CurrentTime />
            <TodoList todos={todos as Array<any>} />
        </div>
    } catch (error) {
        return <div>Ошибка загрузки</div>
    }

}
