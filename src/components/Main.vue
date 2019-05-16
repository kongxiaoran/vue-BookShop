<template>
    <div>
        <el-container>
            <el-header class="header" height="80px">
                <headers></headers>
            </el-header>
            <el-main>
                <!-- <span v-if="!user" class="loginFont">
                        <el-button type="success"  @click="login">点击登录</el-button>
                </span>   -->
                <div class="centerContent">             
                    <transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
                </div>
                
            </el-main>

            <el-aside>
                    <navMenuVue></navMenuVue>
            </el-aside>

            <!-- <span v-if="user&&!navMenuVue">
                
            </span> -->
            
                
        </el-container>
        
    </div>
</template>

<script>
    
    import headers from './header.vue';
    import navMenuVue from './NavMenu.vue';
    
    export default {
        
        created:function(){
           
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
            getStatus (urlStr) {
                var urlStrArr = urlStr.split('/')
                return urlStrArr[urlStrArr.length - 1]
            }
        },
        
        computed: {
            user () {
                return this.$store.state.user
            }
        },
        components: {
            headers,
            navMenuVue,
            key() {
                return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
            }
         },
         watch:{
            '$route' (to, from) {
                console.log(this.getStatus(this.$route.path))
             }
         }
    }
</script>
<style>
    
    .userContent{
        position: relative;
        top: -50px;
        float: right;
    }
    .centerContent{
        position: absolute;
        top: 19%;
        left:15%;
        width:80%;
    }
    .loginFont{
        top: 30%;
        position: absolute;
        left:46%;
    }
</style>
