<template>
    <div>
        <el-table ref="multipleTable" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column prop="eNumber" label="企业编号" width="180" sortable></el-table-column>
            <el-table-column prop="eName" label="企业名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="eIndustry" label="所属行业" width="180"></el-table-column>
            <el-table-column prop="eRange" label="经营范围" width="180"></el-table-column>
            <el-table-column prop="eModel" label="经营模式" width="180"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="180"></el-table-column>
            <el-table-column prop="updateTime" label="更新日期" width="180"></el-table-column>
            <el-table-column prop="recordStatus" label="企业状态" width="180"></el-table-column>
        </el-table>
        <el-pagination background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 100, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                keyword: "集团",
                total: 5,
                currentPage: 1,
　　　　　　　　　 pageSize: 10,
                tableData: [{
                    eNumber: 'A10001',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10001',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10001',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10001',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10001',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10001',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10001',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10001',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10001',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10001',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                }],
                multipleSelection: []
            }
        },
        created: function(){
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData();
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(function(row)  {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            callbackFunction(result) {
                alert(result + "aaa");
            },
            fetchData(){ //获取数据
              this.$http.jsonp("http://localhost:8080/wproject/view/enterprise!getListByParam.action",{//跨域请求数据
                params: {
                    keywords:this.keyword//输入的关键词
                },
                jsonpCallback:'callbackFunction'//这里是callback
              }).then(function(res) {//请求成功回调，请求来的数据赋给searchList数组
                this.total = res.body.count;
                this.currentPage = res.body.curr;
                this.tableData = res.body.data;
                console.info(res);
              },function(res) {//失败显示状态码
                alert("res.status:"+res.status)
              })
          },
            handleSizeChange(val){
              this.pageSize = val;
              this.currentPage = 1;
              this.fetchData(1, val);
              // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val){
              this.currentPage = val;
              this.fetchData(val, this.pageSize);
              // console.log(`当前页: ${val}`);
            }
 
    }
}
</script>
<style>
    .el-table th {
        text-align: center;
    }

    .el-table tbody tr td:first-child {
        text-align: center;
    }
</style>