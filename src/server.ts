// function loggerMiddleware(request:express.Request,response: express.Response,next: any){
//     console.log(`${request.method}${request.path}`)
//     next()
// }

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