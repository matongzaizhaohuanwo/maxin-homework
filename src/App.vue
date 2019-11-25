<template>
  <div id="app">
    <Layout>
      <Header>Header</Header>
      <Content>
        <div class="container">
          <router-view />
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="less">
.container {
  margin-top: 32px;
  padding: 0 24px;
  height: calc(~'100vh - 64px');
}
</style>
