import { useState } from 'react'
import './App.css'


interface setProps {
    Username:string;
    control: "close" | "open";
    setcontrol : React.Dispatch<React.SetStateAction<"close" | "open">>;
    userin :React.Dispatch<React.SetStateAction<"login" | "register" | null>>;
    onClick : React.Dispatch<React.SetStateAction<boolean>>;
    onDone : React.Dispatch<React.SetStateAction<boolean>>;
    onDel : React.Dispatch<React.SetStateAction<boolean>>;
  };

interface connectuserin {
  setU:setProps;
}


interface useridmap {
  id:number;
  subtitle:string;
  title:string
  user_id:number;
  status:string;
  created_at:string;
  deleted_at:string | null;
}

interface fcok {
  onClick : React.Dispatch<React.SetStateAction<boolean>>;
  onDone : React.Dispatch<React.SetStateAction<boolean>>;
  onDel : React.Dispatch<React.SetStateAction<boolean>>;
}

interface onClick {
  onuse : fcok;
}


function App() {
  const [userIn, setUserIn] = useState<"login" | "register" | null>(null);
  const [acUsername,setacUsername] = useState<string>("");
  const [acPassword,setPassword] = useState<string>("");
  const [buttoncontrol,setButtoncontrol] = useState<"close" | "open">("open");
  const [userId,setUserId] = useState("");
  const [create,setCreate] = useState<true | false>(false);
  const [object,setObject] = useState<true | false>(false);
  const [title,setTitle] = useState("");
  const [revise,setRevise] = useState<true | false>(false);
  const[subtitle,setSubtitle] = useState("");
  const [createtitle,setCreatetitle] = useState("");
  const [createcontent,setCreatecontent] = useState("");
  const [createstatus,setCreatestatus] = useState<"pending" | "done" | null>(null);
  const [returnobject,setReturnObject] = useState<useridmap[]>([]);
  const [doneobject,setDoneObject] = useState<useridmap[]>([]);
  const [delobject,setDelObject] = useState<useridmap[]>([]);
  const [fcok,setFcok] = useState<true | false>(false);
  const [del,setDel] = useState <true | false>(false);
  const [obid,setObid] = useState(0);
  const [donebutton,setDonebutton] = useState<true | false>(false);
  const [delbutton,setDelbutton] = useState<true | false>(false);
  const userRegister = ()=>{//注册
    fetch("/api/expense",{
      method:"post",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({username:acUsername,password:acPassword})
    })
  .then(req => req.json())
  .then(req => {
    console.log(req);
    if(req.success){
      alert("申请成功");
      setButtoncontrol("close");
      setUserIn(null);
      setUserId(req.data[0].id);
    }else{alert("申请失败，请重试")};
  })
  }

  const userlogin = ()=> {//登录函数
    fetch("/api/expense/use",{
      method:'post',
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify({username:acUsername,password:acPassword})
    })
    .then(req => req.json())
    .then(data => {
      if(data.success){
        alert(data.message);
        setButtoncontrol("close");
        setUserIn(null);
        setUserId(data.data.userid[0].id);
        console.log(data.data.userdata);
        setReturnObject(data.data.userdata);
        setDoneObject(data.data.userdone);
        setDelObject(data.data.userdel);
        setFcok(true);
      }else{alert("账号密码错误")};
    });
  }

  const createClick = async () => {
    const status = "pending";
    setCreatestatus(status);
    console.log(createstatus);
    await fetch('/api/expense/create/Click',{
      method:'post',
      headers:{'content-Type' : 'application/json'},
      body:JSON.stringify({title:createtitle,content:createcontent,userId,status})
    })
    .then(req => req.json())
    .then(req => {
      setCreate(false);
      setReturnObject((prev)=>prev ? [...prev,...req.data] : [req.data]);  //复杂更新，只提取小块部分更新
      console.log(req.data);
      //setReturnObject([req.data]);
      console.log(returnobject);
      setFcok(true);
    })
  }

  const createRevise = async () => { //修改
    await fetch('/api/expense/create/revise',{
      method:'post',
      headers:{'content-Type' : 'application/json'},
      body:JSON.stringify({subtitle:createcontent,obid,userId})
    })
    .then(req => req.json())
    .then(req => {
      console.log(req);
      setSubtitle(req.data[0].subtitle);
      setReturnObject((prev) => prev.map((item)=> (item.id == obid) ? {...item, subtitle : req.data[0].subtitle} : item));
      setRevise(false);
    })
  }

  const createdel = async () => { //删除函数
    await fetch('/api/expense/create/del',{
      method:'post',
      headers:{'content-Type' : 'application/json'},
      body:JSON.stringify({obid,userId})
    })
    .then(req => req.json())
    .then(req => {
      setReturnObject((prev)=>prev.filter((item)=>item.id != obid));
      setDelObject((prev)=>prev ? [...prev,...req.data] : [req.data]);
      setDel(false);      
      console.log(req);
      setObject(false);
    })
  }

const createdone = async () => {
  const status = "done";
  await fetch('/api/expense/create/done', {
    method: 'post',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify({ obid,status,userId})
  })
    .then(req => req.json())
    .then(req => {
      setReturnObject((prev) => prev.filter((item) => item.id !== obid));
      setDoneObject((prev) => prev ? [...prev, ...req.data] : [req.data]);
      setObject(false);
    });
};

  const buttonac :setProps = //关闭登录/注册按钮
    {Username:acUsername,
    control:buttoncontrol,
    setcontrol:setButtoncontrol,
    userin:setUserIn,
    onClick : setFcok,
    onDone : setDonebutton,
    onDel : setDelbutton
  };

  const buttonuse :fcok = {
    onClick : setFcok,
    onDone : setDonebutton,
    onDel : setDelbutton
  }


  return(
    <div className = "flex flex-col bg-gray-500/50 min-h-screen">
      <div className = "flex p-3 bg-gray-500/50 mx-auto min-w-screen items-center shadow-lg shadow-gray-600 rounded-4xl mt-1 ">
      <div className = "flex-1"></div>
        <h1 className = "flex-2 text-center text-5xl font-semibold tracking-wide">Object manager system</h1>
      <div className = "flex-1 flex justify-end">
        <Acince setU = {buttonac}/>
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

      <div className = "flex justify-center items-start text-2xl pt-10 mb-20 gap-8">
        <Contents onuse = {buttonuse}/>
      {(buttoncontrol == "close") ? (
        <button onClick = {() =>setCreate(true)} className = "bg-gray-600/100 hover:bg-gray-500/100 hover:shadow-white text-white p-5 rounded-2xl inset-shadow-white inset-shadow-sm ring-2 shadow-xl shadow-gray-900/70">创建</button>
      ) : null}
      </div>

      {create ? (
        <div className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className = "relative bg-white rounded-2xl p-6 flex flex-col h-[60vh] w-[40vw] gap-4 shadow-2xl shadow-blue-800">
            <button className = "absolute top-2 right-2 hover:shadow-xl hover:shadow-black/50 hover:rounded-xl active:text-xs hover:bg-gray-600/10" onClick = {() => setCreate(false)}>关闭</button>
          <h1 className = "text-center">创建</h1>
          <label>名称</label>
          <input className = "border-1" onChange = {(e)=>setCreatetitle(e.target.value)}/>
          <label>内容</label>
          <textarea className = "border-1 h-[50vh] pl-2" onChange = {(e)=>setCreatecontent(e.target.value)}></textarea>
          <button onClick = {createClick}>提交</button>
          </div>
        </div>
      ) : null}



      {fcok == true && (
        <div className = " flex h-[65vh] justify-start">
          <div className = "relative inset-0">
                {returnobject.map(({title,subtitle,id},index) => (
            <div key = {index} className = "w-[10vw] h-[50vh] flex flex-col rounded-2xl p-3 ring-1 ring-white inset-shadow-white inset-shadow-sm shadow-2xl shadow-gray-900/30 bg-gray-700/80 absolute hover:bg-gray-700 hover:top-1 top-10"
              style={{ left: `${index * 35}px`, zIndex: index}}
              onClick = {()=>{
                setObid(id);
                setTitle(title);
                setSubtitle(subtitle);
                setObject(true);}}>
                <h2 className = "text-start text-white">{title}</h2>
                <p className = "text-xs text-white">{subtitle}</p>
              </div>
            ))}
        </div>
      </div>
        )}


    {object && object == true ? (
      <div className = "fixed bg-black/50 inset-0 flex justify-center items-center z-50">
        <div className = "relative bg-white rounded-2xl p-6 flex flex-col h-[50vh] w-[40vw] gap-4 shadow-2xl shadow-blue-800">
          <button className = "absolute top-2 hover:shadow-xl hover:shadow-black/50 hover:rounded-xl active:text-xs hover:bg-gray-600/10" onClick = {()=>setRevise(true)}>修改</button>
          <button className = "absolute left-20 top-2 hover:shadow-xl hover:shadow-black/50 hover:rounded-xl active:text-xs hover:bg-gray-600/10" onClick = {()=>setDel(true)}>删除</button>
          <button className = "absolute top-2 right-2 hover:shadow-xl hover:shadow-black/50 hover:rounded-xl active:text-xs hover:bg-gray-600/10" onClick = {()=>setObject(false)}>关闭</button>
          <button className = "absolute right-2 bottom-2 hover:shadow-xl hover:shadow-black/50 hover:rounded-xl active:text-xs hover:bg-gray-600/10" onClick = {()=>createdone()}>完成</button>
          <h1 className = "text-center">{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    ) :  false}

    {revise ? (
        <div className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className = "relative bg-white rounded-2xl p-6 flex flex-col h-[60vh] w-[40vw] gap-4 shadow-2xl shadow-blue-800">
            <button className = "absolute top-2 right-2 hover:shadow-xl hover:shadow-black/50 hover:rounded-xl active:text-xs hover:bg-gray-600/10" onClick = {() => setRevise(false)}>关闭</button>
            <h1 className = "text-center">修改</h1>
           <label>内容</label>
            <textarea className = "border-1 h-[50vh] pl-2" onChange = {(e)=>setCreatecontent(e.target.value)}></textarea>
          <button onClick = {()=>createRevise()} className = "bg-gray-600/50 rounded-xl hover:bg-gray-600/10">提交</button>
          </div>
        </div>
    ) : false}


    {del ? (
        <div className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className = "relative bg-white rounded-2xl p-6 flex flex-col h-[60vh] w-[40vw] gap-4 shadow-2xl shadow-blue-800">
            <button className = "absolute top-2 right-2 hover:shadow-xl hover:shadow-black/50 hover:rounded-xl active:text-xs hover:bg-gray-600/10" onClick = {() => setDel(false)}>关闭</button>
            <h1 className = "text-center">删除</h1>
            <label>删除任务</label>
            <select className = "border border-black rounded ">
              <option>请选择</option>
              {returnobject.map(({title,id},index)=>(
                <div key = {index}>
                  <option onClick = {()=>{
                    setObid(id);
                  }}>{title}</option>
                </div>
              ))}
            </select>            
          <button onClick = {()=>createdel()} className = "bg-gray-600/50 rounded-xl hover:bg-gray-600/10">提交</button>
          </div>
        </div>
    ) : false}


      {donebutton == true && (
        <div className = " flex h-[65vh]">
          <div className = "relative inset-0">
                {doneobject.map(({title,subtitle,},index) => (
            <div key = {index} className = "w-[10vw] h-[50vh] flex flex-col rounded-2xl p-3 ring-1 ring-white inset-shadow-white inset-shadow-sm shadow-2xl shadow-gray-900/30 bg-gray-700/80 absolute hover:bg-gray-700 hover:top-1 top-10"
              style={{ left: `${index * 35}px`, zIndex: index }}>
                <h2 className = "text-center text-white">{title}</h2>
                <p className = "text-xs text-white">{subtitle}</p>
              </div>
            ))}
        </div>
      </div>
        )}

      {delbutton == true && (
        <div className = " flex h-[65vh]">
          <div className = "relative inset-0">
                {delobject.map(({title,subtitle},index) => (
            <div key = {index} className = "w-[10vw] h-[50vh] flex flex-col rounded-2xl p-3 ring-1 ring-white inset-shadow-white inset-shadow-sm shadow-2xl shadow-gray-900/30 bg-gray-700/80 absolute hover:bg-gray-700 hover:top-1 top-10"
              style={{ left: `${index * 35}px`, zIndex: index }}>
                <h2 className = "text-center text-white">{title}</h2>
                <p className = "text-xs text-white">{subtitle}</p>
              </div>
            ))}
        </div>
      </div>
        )}
  </div>
  )}

function Acince ({setU}:connectuserin) {//关闭逻辑
  return(
    <div>
      {(setU.control == "open")?(
        <>
        <button onClick = {() =>  setU.userin("login")} className = "text-xl hover:bg-gray-100/50 pr-1 hover:rounded-xl active:text-3xl font-medium">登入</button>
        <button onClick = {()=> setU.userin("register")} className = "text-xl hover:bg-gray-100/50 hover:rounded-xl active:text-3xl">注册</button>      
        </>
      ):(
        <div className = "flex ">
      <p className = "text-2xl">{setU.Username}</p>
      <button className = "hover:bg-gray-100/50 rounded-lg hover:rounded-xl active:text-xs border-1 ml-10 p-2 " onClick = {() => {
        setU.onClick(false);
        setU.onDone(false);
        setU.onDel(false);
        setU.setcontrol("open");
        }}>登出</button>
        </div>
      )}
    </div>
  )
}

function Contents ({onuse}:onClick) {
  return(
    <>
        <button onClick = {()=>{
          onuse.onClick(true);
          onuse.onDone(false);
          onuse.onDel(false);
        }} 
          className = "bg-gray-600/100 hover:bg-gray-500/100 hover:shadow-white text-white p-5 rounded-2xl inset-shadow-white inset-shadow-sm ring-2 shadow-xl shadow-gray-900/70">Pending</button>
        <button onClick = {()=>{
          onuse.onClick(false);
          onuse.onDone(true);
          onuse.onDel(false)
        }} 
          className = "bg-gray-600/100 hover:bg-gray-500/100 hover:shadow-white text-white p-5 rounded-2xl inset-shadow-white inset-shadow-sm ring-2 shadow-xl shadow-gray-900/70">已完成</button>
        <button onClick = {()=>{
          onuse.onClick(false);
          onuse.onDone(false);
          onuse.onDel(true);
        }}
           className = "bg-gray-600/100 hover:bg-gray-500/100 hover:shadow-white text-white p-5 rounded-2xl inset-shadow-white inset-shadow-sm ring-2 shadow-xl shadow-gray-900/70">记录</button>  
    </>

  )
}


export default App
