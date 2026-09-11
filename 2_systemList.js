const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
    console.log(`收到请求,${req.body},${req.url}`);
    console.log(typeof(req.body));
    console.log(req.body.username);
    console.log(req.body.password);
    next();
});

app.post('/api/expense',async (req,res)=> {
    try{
        const connection = await mysql.createConnection({
            host:'localhost',
            user:'app_user',
            password:'1126!',
            database:"task_manager"
        });

        const bcryptpassword = await bcrypt.hash(req.body.password,10); 

        const [write] = await connection.execute("INSERT INTO users (username,password_hash) VALUES(?, ?)",[req.body.username,bcryptpassword]);

        console.log("插入成功");

        await connection.execute("SELECT * FROM users ORDER BY id");

        await connection.end();

        res.status(200).json({
            success:true,
            message:"写入成功"
        });
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            success:false,
            message:`写入失败${e}`
        });
    }
})

app.post('/api/expense/use',async (req,res)=> {
    try{
        const username = req.body.username
        const errorac = "账号错误";
        const connection = await mysql.createConnection({
            host:'localhost',
            user:'app_user',
            password:'1126!',
            database:'task_manager'
        })

        const [serach] = await connection.execute("SELECT * FROM users WHERE username = ?",[req.body.username]);
        console.log(serach[0].password_hash);

        const isMatch = await bcrypt.compare(req.body.password, serach[0].password_hash);
        if(isMatch){res.status(200).json({success:true,message:"成功"})}else{throw new Error("账号密码错误");}
    }
    catch(e){
        console.error(e);
            res.status(500).json({success:false,message:e});
    }
})

app.listen(3000,()=>{
    console.log("服务器运行,端口3000");
})
