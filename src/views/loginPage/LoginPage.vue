<template>
  <div class="container">
    <logo />
    <h2 class="subtitle">
      HOMEWORK GRADE SYSTEM
    </h2>
    <div class="links">
      <div class="button--grey" @click="handleLoginEvent('teacher')">
        Teacher Login
      </div>
      <div class="button--grey" @click="handleLoginEvent('student')">
        Student Login
      </div>
    </div>
    <login-dialog ref="$loginDialog" />
  </div>
</template>

<script>
import Logo from '../../components/loginPage/Logo.vue';
import LoginDialog from '../../components/loginPage/LoginDialog';

export default {
  components: {
    LoginDialog,
    Logo
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleLoginEvent(userType) {
      if (userType === 'teacher') {
        this.$refs.$loginDialog.show(userType);
      } else {
        this.$refs.$loginDialog.show(userType);
      }
    }
  }
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #35495e;
  word-spacing: 10px;
  padding: 15px 0;
}

.links {
  padding-top: 15px;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
  cursor: pointer;
}
</style>
