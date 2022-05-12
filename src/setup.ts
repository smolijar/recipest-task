import { knex } from 'knex'
import { animal, internet, commerce, lorem, company, random, date, datatype, helpers } from 'faker'

const times = <R>(n: number, fn: (i: number) => R) => Array(n).fill(0).map((_, i) => fn(i))

const client = knex(
    {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'recipest_docker',
            password: 'recipest_docker'
        }
    });

(async () => {
        const USER_COUNT = 10_000;
        const USER_BATCH_COUNT = 100;
        const RECIPES_PER_USER = 50;
        const REVIEWS_PER_USER = 30;
        process.stdout.write('STARTING')
        await Promise.all(times(USER_COUNT / USER_BATCH_COUNT, async (i) => {
            const userData = times(USER_BATCH_COUNT, i => ({
                email: internet.email()
            }));
            const users: { id: string }[] = await client('users').insert(userData, 'id')
            const recipeData = users.flatMap(({ id }) => times(RECIPES_PER_USER, () => {
                const main_ingredient = animal.type() as keyof typeof animal;
                return {
                    name: `The ${commerce.productAdjective()} ${animal[main_ingredient]()} with ${commerce.color()} ${company.bsNoun()}`,
                    main_ingredient,
                    user_id: id,
                    publish_time: datatype.boolean() ? date.past(2) : null,
                    create_time: date.past(1),
                };
            }));
            const recipes: { id: string }[] = await client('recieps').insert(recipeData, 'id')
            const reviewData = users.flatMap(user => helpers.shuffle(recipes).slice(0, REVIEWS_PER_USER).map(recipe => ({
                user_id: user.id,
                reciep_id: recipe.id,
                rating_value: datatype.number(10)
            })));
            await client('reviews').insert(reviewData, 'id')
            i % 2 && process.stdout.write('.')
        }))
        console.log('DONE')
        await client.destroy()
    })()