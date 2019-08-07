<template>
  <div class="user">
    <!-- header -->
    <Row class="user-header" :gutter="30">
      <Col :span="4">
        <Input v-model="keySearch" search placeholder="请输入关键字" @on-search="userSearch" />
      </Col>
      <Col :span="6">
        <Button type="primary" @click="userAddMo = true">新增用户</Button>
      </Col>
    </Row>
    <!-- table -->

    <Table max-height="460" class="user-table" :columns="columns12" :data="tableList">
      <template slot-scope="{ row, index }" slot="gender">
      <span style="font-size:18px">{{row.gender=="male"?"♂":"♀"}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="warning"
          ghost
          shape="circle"
          style="margin-right: 5px"
          icon="md-build"
          @click="userEditMof(row)"
        ></Button>
        <Poptip
          width="150"
          confirm
          placement="right"
          title="你确定要删除?"
          @on-ok="userDel(row)"
          @on-cancel="cancel"
        >
          <Button type="error" ghost shape="circle" icon="md-trash"></Button>
        </Poptip>
      </template>
    </Table>
    <!-- 分页 -->
    <div class="user-page">
     
      <Page :total="count" @on-page-size-change="pagechangesize" @on-change="pagechangenumber" :page-size="pagesize" :current="currentPage" show-elevator />
    </div>
    <!-- 新增用户对话框 -->
    <Modal v-model="userAddMo" title="新增用户" @on-cancel="cancel">
      <!-- 添加用户表单 -->
      <Form ref="formAdd" :model="formAdd" :rules="ruleAdd" :label-width="60">
        <FormItem prop="name" label="用户名">
          <Input type="text" v-model="formAdd.name"></Input>
        </FormItem>
        <FormItem prop="password" label="密码">
          <Input type="password" v-model="formAdd.password"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="userAdd('formAdd')">添加</Button>
      </div>
    </Modal>
    <!-- 编辑用户对话框 -->
    <Modal v-model="userEditMo" title="修改用户" @on-cancel="cancel">
      <!-- 编辑用户表单 -->
      <Form :model="formEdit" :label-width="60">
        <FormItem label="用户名">
          <Input type="text" v-model="formEdit.name" disabled></Input>
        </FormItem>
        <FormItem label="密码">
          <Input type="text" v-model="formEdit.password"></Input>
        </FormItem>
        <FormItem label="Radio">
          <RadioGroup v-model="formEdit.gender">
            <Radio label="male">男</Radio>
            <Radio label="female">女</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="userEdit('formEdit')">修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  created() {
    this.getTableList();
  },
  data() {
    return {

      formAdd: {
        name: "",
        password: ""
      },
      formEdit: {},
      ruleAdd: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      columns12: [
        {
          title: "#",
          type: "index",
          width: 120
        },
        {
          title: "用户名",
          key: "name",
          width: 200
        },
        {
          title: "性别",
          slot: "gender",
          width: 150
        },
        {
          title: "密码",
          key: "password",
          width: 200
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      tableList: [],
      userAddMo: false,
      userEditMo: false,
      keySearch:'',
      currentPage:1, // 当前页码
      pagesize:8,
      count:0
      
    };
  },
  methods: {
    pagechangesize(){
   
    },
    pagechangenumber(e){
    //  console.log(this.pagesize)
     this.currentPage =e
     this.getTableList()
    },
   async userSearch(){
   const res = await this.$axios.get(`/users/search?name=${this.keySearch}`)
     const { data, meta } = res.data;
      if (meta.status == 200) {
        // this.$Message.info("");
        this.keySearch = ''
         this.tableList = data
      }
    },
    userAdd(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          const res = await this.$axios.post("/users/register", this.formAdd);

          const { msg, status } = res.data.meta;

          if (status !== 200) {
            this.$Message.error(msg);
            this.formAdd = {};
            this.userAddMo = false;
            return;
          } else {
            this.$Message.info("添加成功");
          }
          this.userAddMo = false;
          this.formAdd = {};
          this.getTableList();
        }
      });
    },
    cancel() {
      this.formAdd = {};
      this.$Message.info("取消操作");
    },
    async getTableList() {
      const res = await this.$axios.get(`/users?pagesize=${this.pagesize}&pagenumber=${ this.currentPage}`);
    
      const { data, meta } = res.data;
      if (meta.status == 200) {
      this.count = meta.count
        this.tableList = data;
      }
    },
    userEditMof(row) {
      this.formEdit = row;
      this.userEditMo = true;
    },
    async userEdit() {
      const res = await this.$axios.put(
        `/users/${this.formEdit._id}`,
        this.formEdit
      );
      const { data, meta } = res.data;
      if (meta.status == 200) {
        this.$Message.info("修改成功");
      }
      this.userEditMo = false;
    },
    async userDel(row) {
      
      const res = await this.$axios.delete(`/users/${row._id}`);
       const { data, meta } = res.data;
      if (meta.status == 204) {
        this.$Message.info("删除成功");
         this.getTableList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-page {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.user-table {
  margin-top: 10px;
}
.ivu-poptip-inner {
  z-index: 10;
}
</style>
