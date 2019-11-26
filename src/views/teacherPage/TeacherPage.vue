<template>
  <div>
    <Button icon="ios-add" style="margin-bottom: 16px" @click="createHomework">Create Homework</Button>

    <Table class="table" :columns="columns" :data="data" disabled-hover border>
      <router-link slot-scope="{ row }" slot="title" :to="{ name: 'SubmitListPage', params: { id: row.homework_id } }">
        {{ row.title }}
      </router-link>

      <div slot-scope="{ row }" slot="create_time">
        {{ getTimeGMT(row.create_time) }}
      </div>
      <div slot-scope="{ row }" slot="start_time">
        {{ getTimeGMT(row.start_time) }}
      </div>
      <div slot-scope="{ row }" slot="end_time">
        {{ getTimeGMT(row.end_time) }}
      </div>
    </Table>
    <div style="display: flex;justify-content: flex-end;margin-top: 24px">
      <Page :total="50" simple @on-change="currentChange" />
    </div>
    <create-homework-dialog ref="$createHomeworkDialog" />
  </div>
</template>

<script>
import { getTimeGMT } from '@/utils/TimeUtil';
import { sendGetRequest } from '@/utils/NetWorkUtil';
import { API_HOMEWORK_LIST } from '@/constants/Apis';
import CreateHomeworkDialog from '@/components/teacherPage/CreateHomeworkDialog';

export default {
  components: { CreateHomeworkDialog },
  data() {
    return {
      getTimeGMT: getTimeGMT,
      columns: [
        {
          title: '#',
          key: 'homework_id',
          align: 'center',
          width: 60
        },
        {
          title: 'Title',
          slot: 'title'
        },
        {
          title: 'Creator',
          key: 'creator'
        },
        {
          title: 'Create Time',
          slot: 'create_time'
        },
        {
          title: 'Start Time',
          slot: 'start_time'
        },
        {
          title: 'End Time',
          slot: 'end_time'
        }
      ],
      data: []
    };
  },
  mounted() {
    const body = { offset: 0, limit: 5 };
    sendGetRequest(API_HOMEWORK_LIST(), body).then(result => {
      this.data = result.data.homeworks;
    });
  },
  methods: {
    createHomework() {
      this.$refs.$createHomeworkDialog.show();
    },
    currentChange(current) {}
  }
};
</script>

<style scoped lang="less"></style>
