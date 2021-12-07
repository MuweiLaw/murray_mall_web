<template>
  <section>
    <el-container>
      <el-header>
        <el-button>55555</el-button>
      </el-header>
      <el-main>
        <el-button>666666</el-button>
        <el-row>
          <el-col :span="16">
            <el-input type="text" v-model="form.code" auto-complete="off" placeholder="验证码"
                      @keyup.enter.native="getImageCode"/>
          </el-col>
          <el-col :span="8" style="text-align: center;">
            <img v-if="form.src" :src="form.src" @click="getImageCode" style="padding-top:1px;"/>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </section>
</template>

<script>
let data = () => {
  return {
    form: {
      userId: null,
      password: null,
      code: null,
      sessionId: null,
      publicKey: null,
      src: null
    }
  }
}

export default {
  name: 'Login',
  data: data,
  methods: {
    getImageCode () {
      this.$http.get('/admin/getImageCode/' + 'AE069110573211ECA691880FB314B034').then(res => {
        if (!res.data.success) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
          this.error = true
          return
        }
        this.form.src = 'data:image/gif;base64,' + res.data.data.image
        this.form.publicKey = res.data.data.publicKey
        this.show = true
      }).catch(() => (this.error = true))
    }
  },
  mounted () {
    this.getImageCode()
  }
}
</script>

<style scoped>

</style>
