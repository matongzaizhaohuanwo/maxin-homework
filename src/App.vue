<template>
  <div id="app">
    <Layout>
      <div class="layout-header" v-if="showHeader">
        <div style="display: flex;align-items: center">
          <img :src="logo" alt="" style="height: 35px;width: 35px" />
          <span style="margin-left: 8px;font-size: 21px;margin-top: 4px">HOMEWORK GRADE SYSTEM</span>
        </div>
        <div class="logout" @click="logout">
          <span>Logout</span>
        </div>
      </div>
      <Content>
        <div class="container">
          <router-view />
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import VueCookies from 'vue-cookies';
import { logo } from '@/assets/images';
import { API_LOGOUT } from '@/constants/Apis';
import Result, { sendGetRequest } from '@/utils/NetWorkUtil';
import StateCode from '@/constants/StateCode';

Vue.use(VueCookies);

@Component
export default class App extends Vue {
  logo: string = logo;
  showHeader: boolean = true;

  logout() {
    sendGetRequest(API_LOGOUT()).then((result: Result) => {
      if (result.result === StateCode.SUCCESS) {
        this.$router.go(0);
      } else {
        this.$Message.error(result.message);
      }
    });
  }

  @Watch('$store.state.isLogin', { immediate: true, deep: true })
  onLoginStatusChange(val) {
    this.showHeader = val;
  }
}
</script>

<style scoped lang="less">
.container {
  margin-top: 32px;
  padding: 0 48px;
  height: calc(~'100vh - 64px');
}

.layout-header {
  padding: 12px 24px;
  background-color: transparent;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12), inset 0 -1px 0 0 #dadce0;
  display: flex;
  justify-content: space-between;
}

/deep/ .ivu-layout {
  background-color: #fff;
}

.logout {
  padding: 8px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin-right: 1vw;
  font-size: 13px;

  &:hover {
    cursor: pointer;
    background: #f9f9f9;
  }
}
</style>
