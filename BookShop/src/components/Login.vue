<template>
    <div class="loginPage">
        <el-row type="flex" justify="center">
            <el-form  ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
                <div class="loginPage-con">
                    <el-card class="box-card" >
                        <div slot="header" class="clearfix">
                            <span>欢迎登陆</span>
                        </div>
                        <div class="text item">
                           
                            <el-form-item label="用户名" prop="name">
                            <el-input v-model="user.name"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="pass">
                                <el-input v-model="user.pass" type="password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                    <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
                            </el-form-item>
                        </div>
                    </el-card>
                </div>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    export default {
        
        methods: {
            login () {
                // let that = this.$router; 
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        var flag;
                        var map = {
                            "username":this.user.name,
                            "password":this.user.pass
                        }
                        this.$axios.post(
                            '/login'
                            ,map)

                        .then((response)=>{
                            flag=response.data;
                        })
                        .then( (res)=>{
                            if (flag==true) { 
                            // dispatch采用Promise链式调用                         
                                this.$store.dispatch('login', this.user).then(() => {
                                    this.$notify({
                                        type: 'success',
                                        message: '欢迎你,' + this.user.name + '!',
                                        duration: 3000
                                    })
                                    this.setCookie(this.user.name,this.user.pass,10);
                                    this.$router.push('/main')
                                    //这里的用户名并没有储存到Cook中，刷新后就会消失。
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '用户名或密码错误',
                                    showClose: true
                                })
                            }
                        })
                        .catch( (err)=>{
                            console.log(err);
                        })

                
                    }
                    else {
                        return false
                    }
                })
            },
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
        },
        data () {
            return {
                user: {},
                rules: {
                    name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    pass: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            }
        }
    }
</script>
<style>
    .loginPage{
        width: 100%;
        height: 100%;
        background-image: url("../assets/bg1.jpg");
        background-size: 100% 100%;
        background-position: center;
        position: fixed;

    
    }
    .loginPage-con{
        position: absolute;
        background-color: aliceblue;
        right: 100px;
        top: 200px;
    }
    .box-card{
        background-color:azure;
        width: 400px;
    }
    .clearfix{
        text-align: center;
    }
    

</style>
