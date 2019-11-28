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
        <div style="position: relative">
          <Button class="btn-upload" type="primary" size="small">
            Submit
          </Button>
          <input
            id="upload"
            type="file"
            multiple="multiple"
            style="cursor: pointer;position: absolute;top: 0;right: 0;opacity: 0"
            @change="submit(row.homework_id)"
          />
        </div>
        <!--<Button type="primary" size="small" @click="submit(row.id)">Submit</Button>-->
      </template>
    </Table>
    <div style="display: flex;justify-content: flex-end;margin-top: 24px">
      <Page :total="total" simple @on-change="currentChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { getTimeGMT } from '@/utils/TimeUtil';
import Result, { sendGetRequest, sendPostFormRequest } from '@/utils/NetWorkUtil';
import { API_HOMEWORK_LIST, API_SUBMIT_HOMEWORK } from '@/constants/Apis';

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
      data: [],
      total: 0
    };
  },
  mounted() {
    this.getData(0);
  },
  methods: {
    submit(id) {
      const file = document.getElementById('upload');
      const formData = new FormData();
      console.log(file.files);
      formData.set('upload_work_file', file.files[0]);
      formData.set('homework_id', id);
      sendPostFormRequest(API_SUBMIT_HOMEWORK(), formData).then((result: Result) => {});
    },
    currentChange(current) {
      this.getData((current - 1) * 10);
    },
    getData(offset) {
      const body = { offset: offset, limit: 10 };
      sendGetRequest(API_HOMEWORK_LIST(), body).then(result => {
        this.data = result.data.homeworks;
        this.total = result.data.count;
      });
    }
  }
};
</script>

<style scoped lang="less"></style>
