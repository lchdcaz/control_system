import { useState ,useEffect} from 'react'
import './App.css'


interface setProps {
    setU: React.Dispatch<React.SetStateAction<"login" | "register" | null>>

  };

function App() {
  const [userIn, setUserIn] = useState<"login" | "register" | null>(null);
  const [acUsername,setacUsername] = useState<string>("");
  const [acPassword,setPassword] = useState<string>("");

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

  const content = () => {

  }

  return(
    <div className = "flex flex-col bg-gray-500/30">
      <div className = "flex p-3 bg-gray-500/50 mx-auto min-w-screen items-center">
      <div className = "flex-1"></div>
        <h1 className = "text-5xl flex-1 text-center">任务管理系统</h1>
      <div className = "flex-1 flex justify-end">
        <Acince setU = {setUserIn}/>
      </div>

      </div>

        {
          (userIn && userIn == "login")? (
            <div className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className = "relative bg-white rounded-2xl p-6 flex flex-col h-[30vh] w-[40vw] gap-4 shadow-2xl shadow-blue-800">
                <button className = "absolute top-2 right-2" onClick = {() => setUserIn(null)}>关闭</button>
                <h1 className = "self-center text-xl">欢迎使用任务管理系统</h1>
                <label>账号</label>
                <input onChange = {(e) => setacUsername(e.target.value)} className = "border rounded-2xl"/>
                <label>密码</label>
                <input onChange = {(e)=> setPassword(e.target.value)} className = "border rounded-2xl"/>
                <div className = "flex justify-around h-2">
                  <button onClick = {userlogin} className="hover:bg-gray-300/50 hover:h-5 hover:rounded-xl hover:w-14 active:text-xs">登录</button>
                  <button onClick = {() =>setUserIn("register")} className="hover:bg-gray-300/50 hover:h-5 hover:rounded-xl hover:w-24 active:text-xs">注册新账号</button>
                </div>
              </div>
            </div>
          ):(userIn && userIn == "register")? (
            <div className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className = "relative bg-white rounded-2xl p-6 flex flex-col h-[30vh] w-[40vw] gap-4 shadow-2xl shadow-blue-800">
                <button className = "absolute top-2 right-2" onClick = {() => setUserIn(null)}>关闭</button>
                <h1 className = "self-center text-xl">欢迎使用任务管理系统</h1>
                <label>注册账号</label>
                <input onChange = {(e) => setacUsername(e.target.value)} className = "border rounded-2xl"/>
                <label>新密码</label>
                <input onChange = {(e) => setPassword(e.target.value)} className = "border rounded-2xl"/>
                 <div className = "flex justify-around h-2">
                  <button onClick = {userRegister} className="hover:bg-gray-300/50 hover:h-5 hover:rounded-xl hover:w-14 active:text-xs">注册</button>
                  <button onClick = {() =>setUserIn("login")} className="hover:bg-gray-300/50 hover:h-5 hover:rounded-xl hover:w-24 active:text-xs">已有账号</button>
                </div>

              </div>
            </div>
          ):null
        }

      <div className = "flex justify-around items-center h-[15vh] text-2xl">
        <Contents />
      </div>

      <div className = "grid grid-cols-[1fr_4fr] gap-4">
        <div className = "flex flex-col pt-20 gap-35">
          <button>创建</button>
          <button>修改</button>
          <button>删除</button>
          <button>移动</button>
        </div>

      </div>

    </div>

  )
}

function Acince ({setU}:setProps) {
  return(
    <div>
      <button onClick = {() =>  setU("login")} className = "text-xl hover:bg-gray-100/50 pr-1 hover:rounded-xl active:text-3xl">登入</button>
      <button onClick = {()=> setU("register")} className = "text-xl hover:bg-gray-100/50 hover:rounded-xl active:text-3xl">注册</button>
    </div>
  )
}

function Contents () {
  return(
    <>
        <button>新创建</button>
        <button>待处理</button>
        <button>已完成</button>
        <button>记录</button>  
    </>

  )
}

export default App
