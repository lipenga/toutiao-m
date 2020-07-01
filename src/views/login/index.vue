<template>
  <div class="login-container">
    <van-nav-bar title="登陆">
      <van-icon
        name="arrow-left"
        id="back"
        slot="left"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <!-- 手机号 -->
      <van-field
        left-icon="phone-o"
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont icon-icon--"></i>
      </van-field>
      <!-- 验证码 -->
      <van-field
        left-icon="comment-o"
        v-model="user.code"
        type="number"
        maxlength="6"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <!-- 验证码按钮 -->
          <van-count-down
            :time="1000 * 3"
            format="ss s"
            v-if="timevisible == true"
            @finish="timevisible = false"
          />
          <van-button
            v-else
            class="send_sms_btn"
            size="small"
            type="default"
            round
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px;" class="logindiv">
        <van-button block type="info" native-type="submit" class="loginBtn"
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { require: true, message: '手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
          { trigger: onblur }
        ],
        code: [
          { require: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      timevisible: false
    }
  },
  methods: {
    // 提交登陆表单
    async onSubmit() {
      this.$toast.loading({
        message: '登陆中',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      const user = this.user
      try {
        const { data } = await login(user)
        this.$toast.success('登陆成功')
        // 处理token
        this.$store.commit('setUser', data.data)
        this.$router.push('/layout')
        // window.sessionStorage.setItem('tokenx', JSON.stringify(data.data))

        // this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后重试', err)
        }
      }
    },
    // 点击发送验证码
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.timevisible = true
      try {
        // 发验证码请求并且接受
        await sendSms(this.user.mobile)
        this.$toast('发送验证码成功')
      } catch (err) {
        this.timevisible = false
        if (err.response.status === 429) {
          this.$toast.fail('发送过于频繁，请过后再试')
        } else {
          this.$toast('发送失败。请稍后再试')
        }
      }
    }
  }
}
</script>
<style scoped>
.van-nav-bar {
  background-color: #2892ff;
}
.van-nav-bar__title {
  font: #fff;
}
/* .iconfont {
  font-size: 37px;
} */
.send_sms_btn {
  background-color: darkgray;
  width: 152px;
  height: 46px;
  font-size: 22px;
  color: #666;
}
.logindiv {
  padding: 53px 33px;
}
.loginBtn {
  background-color: #6db4fb;
  border: none;
}
#back {
  color: #fff;
}
</style>
