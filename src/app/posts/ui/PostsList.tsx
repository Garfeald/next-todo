import Link from "next/link";
import cls from "./PostsList.module.scss";

// 'use client'

interface ITodos {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface TodoListProps {
    posts: Array<ITodos>
}

export const PostsList = (props: TodoListProps) => {

    const {
        posts
    } = props;

    return (
        <div className={cls.container}>
            {posts.map((post, index) => {
                return (
                    <div className={cls.post} key={post.id}>
                        <Link href={`posts/${post.id}`}>
                            <h4>
                                {`${index + 1}. ${post.title}`}
                            </h4>
                        </Link>
                        <h5>
                            {post.body}
                        </h5>
                    </div>
                )
            })}
        </div>
    );
}
