const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
    console.log(`收到请求,${req.body},${req.url}`);
    console.log(typeof(req.body));
    next();
});

app.post('/api/expense',async (req,res)=> {//注册逻辑
    try{
        const connection = await mysql.createConnection({
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME
        });

        const bcryptpassword = await bcrypt.hash(req.body.password,10); 

        const [write] = await connection.execute("INSERT INTO users (username,password_hash) VALUES(?, ?)",[req.body.username,bcryptpassword]);

        const [userid] = await connection.execute("SELECT id FROM users WHERE username = ?",[req.body.username]);

        console.log(userid);

        console.log("插入成功");

        await connection.end();

        res.status(200).json({
            success:true,
            message:"写入成功",
            data:userid
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

app.post('/api/expense/use',async (req,res)=> {//登录逻辑
    try{

        const connection = await mysql.createConnection({
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME
        })

        const [serach] = await connection.execute("SELECT * FROM users WHERE username = ?",[req.body.username]);

        const [userid] = await connection.execute("SELECT id FROM users WHERE username = ?",[req.body.username]);
        console.log(serach[0].password_hash);

        const isMatch = await bcrypt.compare(req.body.password, serach[0].password_hash);

        const [userdata] = await connection.execute("SELECT * FROM tasks WHERE user_id = ? AND deleted_at IS NULL AND status != ?",[userid[0].id,"done"]);
        console.log(userdata);

        const [userdone] = await connection.execute("SELECT * FROM tasks WHERE status = ? AND user_id = ?",["done",userid[0].id]);

        const [userdel] = await connection.execute("SELECT * FROM tasks WHERE deleted_at IS NOT NULL AND user_id = ?",[userid[0].id]);

        await connection.end();

        if(isMatch){res.status(200).json({success:true,message:"成功",data:{userid,userdata,userdone,userdel}})}else{throw new Error("账号密码错误");}

    }
    catch(e){
        console.error(e);
            res.status(500).json({success:false,message:e});
    }
})

app.post('/api/expense/create/Click', async (req,res)=>{ //新建
    try{
        const hand = req.body;

        const connection = await mysql.createConnection({//异步和同步
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME
    })

        const [write] = await connection.execute("INSERT INTO tasks (user_id, title, subtitle, status) VALUES (?, ?, ?, ?)",[hand.userId,hand.title,hand.content,hand.status]);

        //const [userObject] = await connection.execute("SELECT * FROM tasks WHERE user_id = ?",[hand.userId]);

        const [userObject] = await connection.execute("SELECT * FROM tasks WHERE id = ?",[write.insertId]);

        console.log(write.insertId);

        console.log(userObject);
        res.status(200).json({
            success:true,
            message:"ok",
            data:userObject
        })
    }
    catch(e){
        console.log(e);
    }
    })

app.post('/api/expense/create/revise', async (req,res)=>{
    try{
        const hand = req.body;

        const connection = await mysql.createConnection({//异步和同步
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME
        })

        const [revise] =await connection.execute("UPDATE tasks SET subtitle = ? WHERE id = ?",[hand.subtitle,hand.obid]);

        const [newsub] =await connection.execute("SELECT subtitle FROM tasks WHERE id = ?",[hand.obid]);

        console.log(newsub);

        res.status(200).json({
            success:true,
            data:newsub
        })
        }
    catch(e){
        res.status(500).json({
            success:false,
            data:e
        })
        console.log(e);
    }
})

app.post('/api/expense/create/del', async (req,res)=>{
    try{
        const hand = req.body;

        const connection = await mysql.createConnection({//异步和同步
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME
        })

        const [del] = await connection.execute("UPDATE tasks SET deleted_at = NOW() WHERE id = ?",[hand.obid]);

        const [delOb] =await connection.execute("SELECT * FROM tasks WHERE deleted_at IS NOT NULL AND user_id = ?",[hand.userId]);

        res.status(200).json({
            success:true,
            data:delOb
        })
        }
    catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            data:e
        })

    }
})


app.post('/api/expense/create/done', async (req,res)=>{
    try{
        const hand = req.body;

        const connection = await mysql.createConnection({//异步和同步
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME
        })

        const [done] =await connection.execute("UPDATE tasks SET status = ? WHERE id = ?",[hand.status,hand.obid]);

        const [doneOb] =await connection.execute("SELECT * FROM tasks WHERE status = ? AND user_id = ?",[hand.status,hand.userId]);

        res.status(200).json({
            success:true,
            data:doneOb
        })
        }
    catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            data:e
        })

    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`服务器运行端口${PORT}`);
})
