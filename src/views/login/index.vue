<template>
  <div class="login-wrapper">
    <div id="login">
      <p class="title">商城登录</p>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rulesloginForm"
        ref="loginForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" auto-complete="on" placeholder="请输入用户名">
              <span slot="prefix">
            <svg-icon icon-class="user" class="color-main">
            </svg-icon>
          </span></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="loginForm.pass" auto-complete="on" placeholder="输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="loginPost(loginForm)" style="width:100%;">登录</el-button>
          <p class="register" @click="gotoRegister(loginForm)">还没有账号？立即注册</p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  import https from '@/https.js';
  import { Message } from 'element-ui';

  export default {
    name: "login",
    data() {
      // return {}
      const validateUsername = (rule, value, callback) => {
        if (value == "") {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          name: "",
          pass: "",
        },
        rulesloginForm: {
          pass: [{required: true, trigger: 'blur', validator: validatePass}],
          name: [{required: true, trigger: 'blur', validator: validateUsername}],
        },
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      submitForm(formName) {
        let params ={'custName': 'admin', 'password': 'admin123', 'rememberMe': 'true','isMobile':'1'}
          this.$refs.formName.validate(valid => {
          if (valid) {
            // setTimeout(() => {
            //   alert('注册成功')
            // }, 400);
            https.fetchPost('/api/api/crm/userRegister',params ).then((data) => {
              console.log("data= ", data)
              if (data.data.code == '00000') {
                this.$router.push({path: this.redirect || '/home'})
              } else {
                console.log("登录失败")
              }
            }).catch(err=>{
                console.log(err)
              }
            )
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      },
        handleLogin() {
        this.$router.push({
          path: "/success"
        });
      },
      loginPost(params) {
        // let params ={'custName': 'admin', 'password': 'admin123', 'rememberMe': 'true','isMobile':'1'}
        console.log(params)
        https.fetchPost('/api/api/crm/checkUserAndPass',params ).then((data) => {
          console.log("data= ", data)
          if (data.data.code == '00000') {
            this.$router.push({path: this.redirect || '/home'})
          } else {
            alert(data.data.message)
          }
        }).catch(err=>{
            console.log(err)
          }
        )
      },
      indexPost2 (loginForm) {
        let params ={}
        https.fetchGet('/api/api/crm/list', params)
          .then((data) => {
            this_.base.indexData = data
            this_.check = true
          })
          .catch((err)=>{
            console.log(err)

          })
      },
      gotoRegister() {
        this.$router.push({
          path: "/Register"
        });
      }
    }
  };
</script>
<style scoped>
  #login {
    max-width: 340px;
    margin: 60px auto;
    background: #fff;
    padding: 20px 40px;
    border-radius: 10px;
    position: relative;
    z-index: 9;
  }

  .el-form-item {
    text-align: center;
  }

  .login-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .register {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: left;
    text-indent: 8px;
    width: 160px;
  }

  .title {
    font-size: 26px;
    line-height: 50px;
    font-weight: bold;
    margin: 10px;
    text-align: center;
  }
</style>
