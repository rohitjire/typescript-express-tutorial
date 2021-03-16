import express = require('express')
import Post from './post.interface'
import postModel from './post.models'

class PostController{

    public path = '/posts'
    public router = express.Router()

    private posts = postModel

    constructor(){
        this.intializeRoutes();
    }

    public intializeRoutes(){
        this.router.get(this.path,this.getAllPosts)
        this.router.get(`${this.path}/:id`, this.getPostById)
        this.router.patch(`${this.path}/:id`,this.modifyPost)
        this.router.delete(`${this.path}/:id`,this.deletePost)
        this.router.post(this.path,this.createAPost)

    }
    private getAllPosts = (request:express.Request, response: express.Response)=>{
      this.posts.find()
      .then(posts =>{
        response.send(posts)
      })
    }

    private createAPost = (request: express.Request, response: express.Response) => {
        const postData: Post = request.body;

        const createdPost = new postModel(postData)
        createdPost.save()
        .then(savePost=>{
          response.send(savePost)
        })
      }

    private getPostById(request: express.Request, response: express.Response){
      const id = request.params.id
      this.posts.findById(id)
      .then(post =>{
        response.send(post)
      })
    }

    private modifyPost(request: express.Request, response: express.Response){
      const id = request.params.id
      const postData: Post = request.body
      this.posts.findByIdAndUpdate(id, postData, {new: true})
      .then(
        post=>{
          response.send(post)
        }
      )     
    }

  private deletePost(request: express.Request, response: express.Response){
    const id = request.params.id
    this.posts.findByIdAndDelete(id)
    .then(successResponse =>{
      if(successResponse){
        response.send(200)
      }
      else{
        response.send(404)
      }
    })
  }





    }

export default PostController