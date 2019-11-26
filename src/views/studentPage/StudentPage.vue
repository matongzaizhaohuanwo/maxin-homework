<template>
  <div>
    <Table class="table" :columns="columns" :data="data" disabled-hover border>
      <div slot-scope="{ row }" slot="create_time">
        {{ getTimeGMT(row.create_time) }}
      </div>
      <div slot-scope="{ row }" slot="start_time">
        {{ getTimeGMT(row.start_time) }}
      </div>
      <div slot-scope="{ row }" slot="end_time">
        {{ getTimeGMT(row.end_time) }}
      </div>
      <template slot-scope="{ row }" slot="submit">
        <Button type="primary" size="small" @click="submit(row.work_id)">Submit</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { getTimeGMT } from '@/utils/TimeUtil';
import { sendGetRequest } from '@/utils/NetWorkUtil';
import { API_HOMEWORK_LIST } from '@/constants/Apis';

export default {
  name: 'StudentPage',
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
          key: 'title'
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
        },
        {
          title: ' ',
          slot: 'submit',
          align: 'center',
          width: 100
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
    submit(id) {}
  }
};
</script>

<style scoped lang="less"></style>
