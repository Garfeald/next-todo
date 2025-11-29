import { PostsList } from "./ui/PostsList";

interface ITodos {
    userId: number,
    id: number,
    title: string,
    body: string
}

export default async function Posts() {

    try {
        const posts = await fetch('https://jsonplaceholder.typicode.com/posts', {
            next: {
                revalidate: 60, // ревалидация каждые 60 секунд
                tags: ['posts'] // для инвалидации по тегу
            }
        }).then(res => res.json()) as Array<ITodos>

        return <div>
            <PostsList posts={posts as Array<any>} />
        </div>
    } catch (error) {
        return <div>Ошибка загрузки</div>
    }

}
