<template>
  <el-row v-if="error || !show" class="show-loading">
    <el-col :span="24">
      <label :style="error? {'color': '#F56C6C'} : {'color': '#409EFF'}">
        <i :class="error? 'el-icon-warning' : 'el-icon-loading'"></i>
        {{ error ? '无法链接网络，请刷新页面' : '载入中，请稍候...' }}
      </label>
    </el-col>
  </el-row>
  <el-form v-show="show" :model="form" :rules="rule" ref="form" label-position="left" label-width="0px"
           class="login-container">
    <h3 class="title">后台管理登录</h3>
    <el-form-item prop="userId">
      <el-input type="text" v-model="form.userId" auto-complete="off" placeholder="用户名"/>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"
                @keyup.enter.native="login"/>
    </el-form-item>

    <el-form-item prop="code">
      <el-row>
        <el-col :span="16">
          <el-input type="text" v-model="form.code" auto-complete="off" placeholder="验证码"
                    @keyup.enter.native="login"/>
        </el-col>
        <el-col :span="8" style="text-align: center;">
          <img v-if="form.src" :src="form.src" @click="getImageCode" style="padding-top:1px;"/>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="loginIng">登录
      </el-button>
    </el-form-item>
  </el-form>

</template>

<script>
let data = () => {
  return {
    error: false,
    loginIng: false,
    show: false,
    form: {
      userId: null,
      password: null,

      code: null,
      sessionId: null,
      publicKey: null,
      src: null
    },
    rule: {
      userId: [{
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      }],
      password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }],
      code: [{
        required: true,
        message: '请输入验证码',
        trigger: 'blur'
      }],
    },
    backgroundDiv: {

      backgroundImage: 'url(' + require('../assets/img/homeback.jpg') + ')',
      backgroundRepeat: 'no-repeat',
      height: window.innerHeight - 188 + 'px',
      paddingTop: '188px',
      backgroundSize: '100% 100%'

    }
  }
}
let getImageCode = function () {
  this.form.sessionId = 'wereghfdjgfj6768thfdhd'
  this.$http.get('/admin/admin/getImageCode/' + this.form.sessionId).then(res => {
    if (!res.data.success) {
      this.$message({
        message: res.data.msg,
        type: 'error'
      });
      this.error = true
      return
    }
    this.form.src = 'data:image/gif;base64,' + res.data.data.image
    this.form.publicKey = res.data.data.publicKey
    this.show = true
  }).catch(() => this.error = true)
}

export default {
  name: "login",
  data: data,
  methods: {
    getImageCode,
    // login: function () {
    //   let me = this;
    //   me.$refs.form.validate((valid) => {
    //     if (!valid) {
    //       return false;
    //     }
    //
    //     let param = {
    //       userId: me.form.userId,
    /*      password: me.form.password,*/
    //       code: this.form.code,
    //       sessionId: this.form.sessionId
    //     }
    //     me.loginIng = true
    //     me.$http.post('/admin/admin/login', param).then(res => {
    //       me.loginIng = false;
    //       if (!res.data.success) {
    //         this.getImageCode();
    //         me.$message({
    //           message: res.data.msg,
    //           type: 'error'
    //         });
    //         return
    //       }
    //       let body = res.data.data;
    //       if (body.permissionListVoList.length === 0) {
    //         this.$message({
    //           message: '未能获取权限列表，请联系管理员配置角色！',
    //           type: 'warning'
    //         });
    //         return;
    //       }
    //       sessionStorage.setItem('user', JSON.stringify(body));
    //       let user = JSON.parse(sessionStorage.getItem('user'));
    //       console.log(user.image);
    //       let token = body.token
    //       me.$http.defaults.headers[me.$constants.auth] = token
    //       me.$cookies.set(me.$constants.token, token)
    //
    //       me.$router.push({
    //         path: '/'
    //       })
    //     }).catch(() => me.loginIng = false)
    //   })
    // }
  },
  mounted: function () {
    this.show = true
    this.getImageCode()
  }
}
</script>

<style scoped>

</style>
