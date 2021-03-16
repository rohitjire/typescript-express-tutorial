"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
// function loggerMiddleware(request:express.Request,response: express.Response,next: any){
//     console.log(`${request.method}${request.path}`)
//     next()
// }
const app = express();
const router = express.Router();
//app.use(loggerMiddleware)
app.use(body_parser_1.default.json());
//app.use('/api', router)
router.get('/', (request, response) => {
    response.send({
        hostname: request.hostname,
        path: request.path,
        method: request.method,
    });
});
app.listen(5000);
//# sourceMappingURL=server.js.map