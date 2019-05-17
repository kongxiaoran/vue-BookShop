<template>
   
   <div id="createBook">
       
        <el-col :span="12" push="2">
        <el-form :model="BookForm" label-width="80px" :rules="BookFormRules" ref="BookForm">
          <el-form-item label="书籍编号" prop="bookNumber">
            <el-input v-model="BookForm.bookNumber" auto-complete="off" placeholder="书籍编号"></el-input>
          </el-form-item>
          <el-form-item label="书名" prop="bookName">
            <el-input v-model="BookForm.bookName" auto-complete="off" placeholder="书名"></el-input>
          </el-form-item>

          <el-form-item label="作者名" prop="author">
            <el-input v-model="BookForm.author" auto-complete="off" placeholder="作者名"></el-input>
          </el-form-item>

          <el-form-item label="出版社">
            <el-select clearable size='mini' v-model="BookForm.publishingHourse" placeholder="出版社" autocomplete="off"
                     style="width: 40%">
            <el-option v-for="item in publishingHourseList" :key="item.key" :label="item.label"
                       :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="出版日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="BookForm.publishingDate" 
              value-format=" yyyy-MM-dd" format="yyyy-MM-dd "></el-date-picker>
          </el-form-item>

          <el-form-item label="价格">
            <el-input-number v-model="BookForm.price" :min="0" :max="400" placeholder="价格"></el-input-number>
          </el-form-item>

          <el-form-item label="图书分区" prop="location">
            <el-input v-model="BookForm.location" auto-complete="off" placeholder="图书分区"></el-input>
          </el-form-item>

          <el-form-item label="书籍类别">
            <el-select clearable size='mini' v-model="BookForm.bookType" placeholder="书籍类别" autocomplete="off"
                     style="width: 50%">
            <el-option v-for="item in TypeList" :key="item.key" :label="item.label"
                       :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="图书简介">
            <el-input type="textarea" v-model="BookForm.context" placeholder="图书简介"></el-input>
          </el-form-item>

          <el-form-item label="图书图片地址">
            <el-input v-model="BookForm.imgsrc" placeholder="图书图片地址"></el-input>
          </el-form-item>

        </el-form>
        </el-col>
        <el-col push="6">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </el-col>
        

        <el-upload
            v-show="uploadBoxShow"
            class="uploadBox"
            action=""
            list-type="picture"
            drag
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="UpladFile"
            >
        
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将书籍图片拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <img width="200"  height="200" id="imgshow" src="" alt=""/>

        
        
   </div>

    

</template>

<script>
 export default {
    data() {
        var xhr;
        var ot;//
        var oloaded;
      return {
        formData:[],
        uploadBoxShow:true,
        fileName:'',    //上传图片名称
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
        BookForm: {
            bookNumber:'',
            bookName: '',
            author:'',
            publishingHourse:'',
            publishingDate: '',
            price: '',
            location:'',
            bookType:'',
            context:'',
            imgsrc:'http://localhost:8080/BookShopOfSpring2/static/',
        },
        createLoading:false,

        //编辑表单验证
        BookFormRules: {
            bookNumber: [
            { required: true, message: '请输入图书编号', trigger: 'blur' }
            ]
        },

      };
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
       
        handlePreview(file) {
            console.log(file);
        },
        editSubmit:function(){
            this.$refs.BookForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.createLoading = true;
                        this.BookForm.imgsrc=this.BookForm.imgsrc+this.fileName;
                        let para = Object.assign({}, this.BookForm);
                        // para.publishingDate = (!para.publishingDate || para.publishingDate == '') ? '':util.formatDate.format(new Date(para.publishingDate), 'yyyy-MM-dd');
                        this.createBook(para);
                    });
                }
            });
        },
         createBook:function(para){
            this.$axios.post('/addBook',para).then((res) => {
                if(res.data==true){
                    this.$message.success('提交成功');
                }

                this.$refs['BookForm'].resetFields();
                this.createLoading = false;
                this.$router.push('/editBook');
                }).catch(function(error){
                    console.log(error);
            })
        },
        UpladFile(file){
           
            
            var fileObj = file;
            var isLtM = fileObj.size / 1024 / 1024 < 5
            this.fileName=file.name;
             if(!isLtM){
                    this.$message({
                    message: '上传文件大小不能超过 5MB!',
                    type: 'warning'

             })}else{

                    var reader = new FileReader();
                    reader.readAsDataURL(fileObj);
                    reader.onload=function(e){
                        document.getElementById('imgshow').src = reader.result;
                    };


                    // var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
                    var url = "http://localhost:8080/BookShopOfSpring2/imgUpload"; // 接收上传文件的后台地址 
                    var form = new FormData(); // FormData 对象
                    form.append("mf", fileObj); // 文件对象
                    this.xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
                    this.xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
                    this.xhr.send(form); //开始上传，发送form数据
                    this.uploadBoxShow=false;
                    //使用该对象读取file文件
                    
                    // reader.readAsDataURL(fileObj);
                    throw new Error("手动抛出异常!");   //这里手动抛出异常，可以异常中断。
                    return;
                }
        }
        
    }
 }
</script>

<style>
    .uploadBox{
        position: absolute;
        top:180px;
        left: 800px;
        height: 200px;
        width: 200px;
    }
    #imgshow{
        position: absolute;
        top:20px;
        left: 900px;
        height: 200px;
        width: 200px;
        
    }
    
</style>

