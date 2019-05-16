<template>
    <div id="navMenu">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>

         <el-menu default-active="this.$route.path" class="el-menu-vertical-demo" 
            @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="handleSelect"
            background-color="#F5F5F5">
            
            <el-submenu v-for="(item,i) in navList" :key="i" v-show="item.second" :index="item.name">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ item.navItem}}</span>
                </template>
                <el-menu-item v-for="(sec,j) in item.second" :key="j" :index="sec.name">{{sec.navItem}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-for="(item,i) in navList" :key="i" v-show="!item.second" :index="item.name">
            {{ item.navItem }}
            </el-menu-item>

            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>图书</span>
                </template>
                <el-menu-item index="1-3">添加图书</el-menu-item>
                <el-submenu index="1-4">
                    <template slot="title">修改图书</template>
                    <el-menu-item index="1-4-1">删除图书</el-menu-item>
                </el-submenu>
          </el-submenu>

        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: true,
                navList:[
                    {name:'',navItem:'图书',
                        second:[{name:'/communityActivity',navItem:'添加图书'},
                                {name:'/bookstable',navItem:'删除图书'}]}
                ]
            };
        },

        created:function(){
            alert("navMenu");
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.$router.push(key);
            }
        }
  }
</script>
<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
