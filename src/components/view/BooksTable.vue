<template>
    <div id="booksTable">
        <el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%" 
            @selection-change="handleSelectionChange" @expand-change="expandChange" :cell-style="cellStyle" :header-cell-style="rowClass">

            
            <el-table-column type="expand" width="60">
              <template slot-scope="props">
                <el-form label-position="left"  inline class="demo-table-expand">
                  <el-form-item>
                    <span>
                      <img :src="props.row.imgsrc" style="width: auto; height:auto; max-width:80%; max-height:80%; float:left"/>
                      <div style="float:right">
                        {{props.row.context}}
                      </div>
                    </span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column prop="bookNumber" label="图书编号" width="100" sortable></el-table-column>
            <el-table-column prop="bookName" label="图书名称" show-overflow-tooltip width="200"></el-table-column>
            <el-table-column prop="author" label="作者" width="100"></el-table-column>
            <el-table-column prop="publishingHourse" label="出版社" width="100"></el-table-column>
            <el-table-column prop="publishingDate" label="出版日期" width="100"></el-table-column>
            <el-table-column prop="price" label="价格" width="100"></el-table-column>
            <el-table-column prop="bookType" label="类别" width="100"></el-table-column>
            <el-table-column prop="location" label="分区" width="100"></el-table-column>
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
            :page-sizes="[5,10,50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <!-- 提示删除页面 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
          <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="delVisible = false">取 消</el-button>
              <el-button type="primary" @click="deleteRow" >确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="编辑" :visible.sync="editFormVisible"  :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="editForm.sex">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="editForm.addr"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
		</el-dialog>

        
    </div>
    
</template>
<script>
export default {
    data(){
        return {
                keyword: "集团",
                total:5,
                delVisible:false,    //提示删除框的状态
                currentPage: 1,
　　　　　　　　　pageSize: 5,
                editBook:{
                    'sid':'','sname':'','sage':''
                },
                msg:"",//记录每一条的信息，便于取id
                delarr:[],//存放删除的数据
                tableData: [],
                multipleSelection: [],
                editFormVisible: false,//编辑界面是否显示
                //编辑界面数据
                editForm: {
                  id: 0,
                  name: '',
                  sex: -1,
                  age: 0,
                  birth: '',
                  addr: ''
                },

                //编辑表单验证
                editFormRules: {
                  name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                  ]
                },
        
        }
    },
    
    created: function(){
      this.getPackData();
      this.total=this.tableData.length;
    },

    methods: {

      getPackData() {
         this.$axios.post('/getAllBook').then((res) => {
           
              // this.tableData = res.data.body;
              this.tableData = res.data;
              this.total=this.tableData.length;
              // alert(JSON.stringify(res.data));
              // alert("sdfa:"+this.tableData);
          }).catch(function(error){
                console.log(error);
      })},
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

      handleDelete(index, row) {
        this.msg=row;
        this.delarr.push(this.msg.bookNumber);//把单行删除的每条数据的id添加进放删除数据的数组
        this.delVisible = true;
      },
      deleteRow(){
        var map = {
          "bookNumber":this.delarr[0]
        }
        this.$axios.post("/deleteBook",map)
        .then(res=>{
            if(res.data==true){
              this.getPackData();
              this.$message.success('删除成功');
          }
        }).catch(error=>{
            console.log(error);
            this.$message.error('包装删除失败')
        })
            this.msg="";
            this.delarr=[];
            this.delVisible = false;//关闭删除提示模态框
      },

      //显示编辑界面   Object.assign({}, row) 浅拷贝、对象属性的合并
      handleEdit: function (index, row) {
				this.editFormVisible = true;
				// this.editForm = Object.assign({}, row);
			},

    },

} 
</script>
<style>
    .el-table th {
        text-align: center;
    }

    /* .el-table tbody tr td:first-child {
        text-align: center;
    } */
</style>
