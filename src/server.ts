import PostController from './posts/posts.controller'
import App from './app'
import 'dotenv/config'
import validateEnv from './utils/validateEnv'

validateEnv()


const app = new App(
    [
        new PostController
    ],
    5000,
)

app.listen()