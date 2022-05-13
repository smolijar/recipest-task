import { knex} from "knex";

export const client = knex(
    {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'recipest_docker',
            password: 'recipest_docker',
            database: 'recipest_docker'
        }
    })

export function fetchFull(): Promise<any> {
    return client('recieps as rc')
        .join('reviews as rw', 'rc.id', 'rw.reciep_id')
        .select('rc.id', 'rc.name', {mainIngredient: 'rc.main_ingredient', publishTime: 'rc.publish_time', averageRating: 'rw.rating_value'})
        .where('rw.rating_value','>=',8)
        .limit(20)
        .orderBy('rc.publish_time', 'rc.create_time')
        .then(rows => rows);
}