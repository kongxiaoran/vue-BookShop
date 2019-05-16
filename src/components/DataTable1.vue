<template>
    <div id="booksTable">
        <el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%" 
            @selection-change="handleSelectionChange" @expand-change="expandChange" :cell-style="cellStyle" :header-cell-style="rowClass">

            
            <el-table-column type="expand" width="60">
              <template slot-scope="props">
                <el-form label-position="left"  inline class="demo-table-expand">
                  <el-form-item>
                    <span>
                      <img :src="props.row.imgsrc" style="width: auto; height:auto; max-width:50%; max-height:50%; float:left"/>
                      <div>
                        {{props.row.context}}
                      </div>
                      
                    </span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column prop="eNumber" label="图书编号" width="100" sortable></el-table-column>
            <el-table-column prop="eName" label="图书名称" show-overflow-tooltip width="200"></el-table-column>
            <el-table-column prop="eIndustry" label="作者" width="100"></el-table-column>
            <el-table-column prop="eRange" label="出版社" width="100"></el-table-column>
            <el-table-column prop="eDate" label="出版日期" width="100"></el-table-column>
            <el-table-column prop="eModel" label="价格" width="100"></el-table-column>
            <el-table-column prop="createTime" label="类别" width="100"></el-table-column>
            <el-table-column prop="updateTime" label="分区" width="100"></el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>

          

        </el-table>
        <el-pagination background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10,50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
                keyword: "集团",
                total:5,
                currentPage: 1,
　　　　　　　　　pageSize: 10,
                editBook:{
                    'sid':'','sname':'','sage':''
                },
                tableData: [{
                    eNumber: 'A10001',
                    eName: '高等数学',
                    eIndustry: '黄海平',
                    eRange: '同济大学',
                    eDate:'2015/7/23',
                    eModel: '45',
                    createTime: '大学教材',
                    updateTime: '理工图书A区',
                    imgsrc:'/static/img/高等数学.jpg',
                    context:'内容简介：相对于初等数学而言，数学的对象及方法较为繁杂的一部分。广义地说，初等数学之外的数学都是高等数学， 也有将中学较深入的代数、几何以及简单的集合论初步、逻辑初步称为中等数学的， 将其作为中小学阶段的初等数学与大学阶段的高等数学的...',
                },{
                    eNumber: 'A10002',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1',
                    imgsrc:'/static/img/bg1.jpg'
                },{
                    eNumber: 'A10003',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10003',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10003',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10003',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10003',
                    eName: 'YE集团',
                    eIndustry: '金融业',
                    eRange: '商业',
                    eModel: '国有企业',
                    createTime: '2017-03-27',
                    updateTime: '2016-03-27',
                    recordStatus: '1'
                },{
                    eNumber: 'A10003',
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
      this.total=this.tableData.length;
      alert("aaaa");
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
      },
      cellStyle({row,column,rowIndex,columnIndex}){
        return "text-align:center;" 
      },
      rowClass({row,rowIndex}){
        return "text-align:center;" 
      },

    },

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
