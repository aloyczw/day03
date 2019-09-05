//多组用户登录验证
//需要将数据拆分  拆分成数组
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
            console.log(userData)
            console.log('用户数据解析',qs.parse(userData))
            let userArr=userData.split('@@')
            let newData=userArr.map((item)=>{
                return qs.parse(item)
            }) 
            let state=false//有没有满足条件的
            for(let index=0;index<newData.length;index++){
                let tmp=newData[index]
                if(tmp.us===us&&tmp.ps===ps){
                    state=true
                    break;
                }
            }
            if(state){
                res.send({err:0,msg:'login ok'})
            }else{
                res.send({err:-1,msg:'login NO'})
            }
        }
    })
})
router.post('/reg',(req,res)=>{
    let {us,ps}=req.body
    let string=`@@${qs.stringify({us,ps})}`//
    console.log(string)
    try{
        fs.appendFileSync(path.join(__dirname,'./user.txt'),string)
    }catch(error){
        return res.send({err:-1,msg:'reg NO'})
    }
    res.send({err:0,msg:'reg ok'})
})
module.exports=router