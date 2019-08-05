<template>
  <div class="login-content">
    <Form ref="formLogin" class="login-form" :model="formLogin" :rules="ruleLogin">
      <h1 class="login-title">跳蚤后台管理</h1>
      <FormItem prop="name">
        <Input type="text" v-model="formLogin.name">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formLogin.password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formLogin')" long>登陆</Button>
        <!-- <Button @click="handleReset('formLogin')" style="margin-left: 8px">Reset</Button> -->
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLogin: {
        name:'',
        password:''
      },
      ruleLogin: {
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
      }
    };
  },
  methods: {
     handleSubmit(name) {
      this.$refs[name].validate( async valid => {
        if (valid) {
         
          const res = this.$axios.post('/users/login', this.formLogin)
          this.$Message.success("登陆成功");
        } else {
          this.$Message.error("登陆失败");
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.login-content {
  height: 100%;
  background: url(../../public/images/bg-2.jpg) no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .login-form {
    border-radius: 6px;
    width: 300px;
    padding: 40px 30px;
    padding-bottom: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    .login-title {
      font-size: 22px;
      color: #fff;
      position: relative;
      left: 0;
      top: -20px;
    }
  }
}
</style>
