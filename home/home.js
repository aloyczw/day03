//单一数据登录验证 成功失败


const express=require('express')
const router=express.Router()
const fs=require('fs')
const path=require('path')
const qs=require('querystring')
router.get('/login',(req,res)=>{
    let {us,ps}=req.query//es6的结构赋值
    fs.readFile(path.join(__dirname,'./user.txt'),'utf8',(err,userData)=>{
        if(err){
            res.send({err:-3,msg:'内部文件读取错误 请重试'})
        }else{
            console.log(qs.parse(userData)) 
            let user=qs.parse(userData)
            if(user.us===us&&user.ps===ps){
                res.send({err:0,msg:'login ok'})
            }else{
                res.send({err:-1,msg:'login NO'})
            }
        }
    })
})
router.post('/reg',(req,res)=>{
    res.send({err:0,msg:'reg ok'})
})
module.exports=router