import { useState } from 'react'
import './App.css'


interface setProps {
    setU: React.Dispatch<React.SetStateAction<"login" | "register" | null>>

  };

function App() {
  const [userIn, setUserIn] = useState<"login" | "register" | null>(null);
  const [acUsername,setacUsername] = useState("");
  const [acPassword,setPassword] = useState("");

  const userRegister = ()=>{
    fetch("http://127.0.0.1:3000/api/expense",{
      method:"post",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({username:acUsername,password:acPassword})
    })
  .then(req => req.json())
  .then(req => {
    if(req.success){alert("申请成功")}else{alert("申请失败，请重试")};
  })
  }

  const userlogin = ()=>{
    fetch("http://127.0.0.1:3000/api/expense/use",{
      method:'post',
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify({username:acUsername,password:acPassword})
    })
    .then(req => req.json())
    .then(data => {
      if(data.success){alert(data.message)}else{alert("账号密码错误")};
    });
  }

  return(
    <div>
        <h1>任务管理系统</h1>
        <Acince setU = {setUserIn}/>
        {
          (userIn && userIn == "login")? (
            <div>
              <h1>欢迎使用任务管理系统</h1>
              <label>账号</label>
              <input onChange = {(e) => setacUsername(e.target.value)}/>
              <label>密码</label>
              <input onChange = {(e)=> setPassword(e.target.value)}/>
              <button onClick = {userlogin}>登录</button>
            </div>
          ):(userIn && userIn == "register")? (
            <div>
              <h1>欢迎使用任务管理系统</h1>
              <label>注册账号</label>
              <input onChange = {(e) => setacUsername(e.target.value)}/>
              <label>新密码</label>
              <input onChange = {(e) => setPassword(e.target.value)}/>
              <button onClick = {userRegister}>注册</button>
            </div>
          ):null
        }

      <div>
        <button>新创建</button>
        <button>待处理</button>
        <button>已完成</button>
        <button>记录</button>
      </div>

      <div>
        <button>创建</button>
        <button>修改</button>
        <button>删除</button>
        <button>移动</button>
      </div>

    </div>

  )
}

function Acince ({setU}:setProps) {
  return(
    <div>
      <button onClick = {() =>  setU("login")}>登入</button>
      <button onClick = {()=> setU("register")}>注册</button>
    </div>
  )
}

export default App
