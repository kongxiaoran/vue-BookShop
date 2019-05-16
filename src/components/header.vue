<template>
    <div id="header">
        <h2>图书管理系统</h2>
        <div class="userContent">
            <span>
                <label>欢迎你</label>&nbsp;&nbsp;&nbsp;{{this.username}}&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="warning"  @click="login" style="">注销</el-button>
            </span>
        </div>
    </div>
</template>

<script>
    export default {

        data(){
            return{
                username:''
            }
        },
        created:function(){
            this.username=this.getUserName();
        },
        methods: {
            login () {
                this.$router.replace('/login')
            },
            logout () {
                this.$store.dispatch('logout').then(() => {
                    this.$router.replace('/login')
                })
            },
            dataPath(){
                this.$router.replace('/dataTable')
            },
            getUserName(){
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        if (arr2[0] == 'userName') {
                            return arr2[1];
                        } 
                    }
                }
            }
        },
        computed: {
            user () {
                return this.$store.state.user
            }
        }
    }
</script>
<style>
    .userContent{
        position: relative;
        top: -40px;
        float: right;
    }
</style>
