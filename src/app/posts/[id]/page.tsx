import cls from './Post.module.scss';

interface Props {
    params: {
        id: string;
    };
}

interface IPost {
    userId: number,
    id: number
    title: string,
    body: string
}

interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

export default async function Post({ params }: Props) {

    const { id } = await params;

    let post: IPost = {
        userId: 0,
        id: 0,
        title: '',
        body: ''
    }

    let user: IUser = {
        id: 0,
        name: '',
        username: '',
        email: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: {
                lat: '',
                lng: ''
            }
        },
        phone: '',
        website: '',
        company: {
            name: '',
            catchPhrase: '',
            bs: ''
        }
    }

    // Искусственная задержка
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            next: {
                revalidate: 30, // ревалидация каждые 60 секунд
                tags: ['posts'] // для инвалидации по тегу
            }
        }).then(res => res.json()) as IPost

        if (post.userId) {
            user = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`, {
                next: {
                    revalidate: 30, // ревалидация каждые 60 секунд
                    tags: ['users'] // для инвалидации по тегу
                }
            }).then(res => res.json()) as IUser
        }

        if (post && user) {
            return <div className={cls.container}>
                <div className={cls.post}>
                    <h4>
                        {user.name ?? ''}
                    </h4>
                    <h5>
                        {`post: ${post.title}`}
                    </h5>
                    <h5>
                        {`website: ${user.website}`}
                    </h5>
                    <h5>
                        {`username: ${user.username}`}
                    </h5>
                    <h5>
                        {`company: ${user.company.name}`}
                    </h5>
                    <h5>
                        {`phone: ${user.phone}`}
                    </h5>
                    <h5>
                        {`catchPhrase: ${user.company.catchPhrase}`}
                    </h5>
                    <h5>
                        {`address: ${user.address.city}, ${user.address.street}`}
                    </h5>
                </div>
            </div>
        }
    } catch (error) {
        return <div>Ошибка загрузки</div>
    }

}
