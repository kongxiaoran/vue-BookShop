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

        <!-- 编辑页面 -->
        <el-dialog title="编辑" :visible.sync="editFormVisible"  :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="书号" prop="bookNumber">
            <el-input v-model="editForm.bookNumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="书名" prop="bookName">
            <el-input v-model="editForm.bookName" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="作者名" prop="author">
            <el-input v-model="editForm.author" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="出版社">
            <el-select clearable size='mini' v-model="editForm.bookType" placeholder="出版社" autocomplete="off"
                     style="width: 40%">
            <el-option v-for="item in publishingHourseList" :key="item.key" :label="item.label"
                       :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="出版日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.publishingDate" 
              value-format=" yyyy-MM-dd" format="yyyy-MM-dd "></el-date-picker>
          </el-form-item>

          <el-form-item label="价格">
            <el-input-number v-model="editForm.price" :min="0" :max="400"></el-input-number>
          </el-form-item>

          <el-form-item label="图书分区" prop="location">
            <el-input v-model="editForm.location" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="书籍类别">
            <el-select clearable size='mini' v-model="editForm.bookType" placeholder="书籍类别" autocomplete="off"
                     style="width: 50%">
            <el-option v-for="item in TypeList" :key="item.key" :label="item.label"
                       :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="图书简介">
            <el-input type="textarea" v-model="editForm.context"></el-input>
          </el-form-item>

          <el-form-item label="图书图片地址">
            <el-input v-model="editForm.imgsrc"></el-input>
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
                
                msg:"",//记录每一条的信息，便于取id
                delarr:[],//存放删除的数据
                tableData: [],
                multipleSelection: [],
                editFormVisible: false,//编辑界面是否显示

                //图书类别表
                TypeList:[
                  {
                    key:'新书',
                    label:'新书'
                  },{
                    key:'精品',
                    label:'精品'
                  },{
                    key:'普通',
                    label:'普通'
                  },
                ],
                publishingHourseList:[
                   {
                    key:'清华大学出版社',
                    label:'清华大学出版社'
                  },{
                    key:'北京师范大学出版社',
                    label:'北京师范大学出版社'
                  },{
                    key:'中国科学技术大学出版社',
                    label:'中国科学技术大学出版社'
                  },
                ],
                //编辑界面数据
                editForm: {
                  bookNumber:'',
                  bookName: '',
                  author:'',
                  publishingHourse:'',
                  publishingDate: '',
                  price: '',
                  location:'',
                  bookType:'',
                  context:'',
                  imgsrc:'',
                },
                editLoading:false,

                //编辑表单验证
                editFormRules: {
                  bookNumber: [
                    { required: true, message: '请输入图书编号', trigger: 'blur' }
                  ]
                },
        
        }
    },
    
    created: function(){
      this.getPackData();
      this.total=this.tableData.length;
    },

    mounted() {
			this.getPackData();
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
				this.editForm = Object.assign({}, row);
      },

      editBook:function(para){
        
        this.$axios.post('/editBook',para).then((res) => {
            if(res.data==true){
              this.$message.success('提交成功');
            }

            this.$refs['editForm'].resetFields();
            this.editFormVisible = false;
            this.getPackData();
            this.editLoading = false;
                
          }).catch(function(error){
                console.log(error);
       })
      },

      editSubmit:function(){
        this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
              //NProgress.start();
              
							let para = Object.assign({}, this.editForm);
              
							// para.publishingDate = (!para.publishingDate || para.publishingDate == '') ? '':util.formatDate.format(new Date(para.publishingDate), 'yyyy-MM-dd');
              this.editBook(para);
						});
					}
				});
      }
      
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
