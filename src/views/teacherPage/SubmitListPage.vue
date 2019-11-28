<template>
  <div>
    <Button icon="ios-arrow-back" style="margin-bottom: 16px" @click="back">Back</Button>

    <Table class="table" :columns="columns" :data="data" disabled-hover border>
      <div slot-scope="{ row }" slot="upload_time">
        {{ getTimeGMT(row.upload_time) }}
      </div>
      <template slot-scope="{ row }" slot="assess">
        <Button type="primary" size="small" style="margin-right: 8px" @click="watch(row.homework_id, row.title)">
          Watch
        </Button>
        <Button type="error" size="small" @click="assess(row.work_id)">Grade</Button>
      </template>
    </Table>
    <div style="display: flex;justify-content: flex-end;margin-top: 24px">
      <Page :total="total" simple @on-change="currentChange" />
    </div>
    <assess-dialog ref="$assessDialog" />
  </div>
</template>

<script>
import { getTimeGMT } from '@/utils/TimeUtil';
import { sendGetRequest } from '@/utils/NetWorkUtil';
import { API_HOMEWORK_LIST, API_SUBMIT_LIST } from '@/constants/Apis';
import { API_GET_FILE } from '@/constants/Apis';
import AssessDialog from '@/components/teacherPage/AssessDialog';

export default {
  components: { AssessDialog },
  data() {
    return {
      getTimeGMT: getTimeGMT,
      columns: [
        {
          title: '#',
          key: 'work_id',
          align: 'center',
          width: 60
        },
        {
          title: 'Name',
          key: 'creator'
        },
        {
          title: 'Upload Time',
          slot: 'upload_time'
        },
        {
          title: 'Score',
          key: 'score'
        },
        {
          title: 'Comment',
          key: 'comment'
        },
        {
          title: ' ',
          slot: 'assess',
          align: 'center',
          width: 165
        }
      ],
      data: [],
      total: 10
    };
  },
  mounted() {
    this.getData(0);
  },
  methods: {
    back() {
      this.$router.back();
    },
    watch(id, filename) {
      const element = document.createElement('a');
      element.href = `${API_GET_FILE()}?homework_id=${12}&file_name=${filename}`;
      element.download = 'filename';
      element.type = 'application/octet-stream';
      element.click();
    },
    assess(id) {
      this.$refs.$assessDialog.show(id);
    },
    currentChange(current) {
      this.getData((current - 1) * 10);
    },
    getData(offset) {
      const body = { offset: offset, limit: 10, homework_id: parseInt(this.$route.params.id) };
      sendGetRequest(API_SUBMIT_LIST(), body).then(result => {
        this.data = result.data.Works;
        this.total = result.data.count;
      });
    }
  }
};
</script>

<style scoped lang="less"></style>
