<template>
  <Modal ref="model" v-model="dialogVisible" title="Create Homework" width="450" :mask-closable="false">
    <Form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="top">
      <FormItem prop="title" label="Title">
        <Input v-model="ruleForm.title" placeholder="Title" />
      </FormItem>
      <FormItem prop="grade" label="Grade">
        <Cascader :data="gradeData" v-model="ruleForm.grade" placeholder="Select grade" />
      </FormItem>

      <FormItem prop="startTime" label="Start Time">
        <DatePicker
          style="width: 418px"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          placeholder="Select start time"
          v-model="ruleForm.startTime"
          long
        />
      </FormItem>

      <FormItem prop="endTime" label="End Time">
        <DatePicker
          style="width: 418px"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          placeholder="Select end time"
          v-model="ruleForm.endTime"
          long
        />
      </FormItem>
      <FormItem style="margin-bottom: 0">
        <div style="text-align: right">
          <Button @click="hide" type="text">Cancel</Button>
          <Button @click="submitForm('ruleForm')" type="primary" style="margin-left: 8px">Ok</Button>
        </div>
      </FormItem>
    </Form>
    <div slot="footer"></div>
  </Modal>
</template>

<script lang="ts">
import Result, { sendGetRequest, sendPostJsonRequest } from '@/utils/NetWorkUtil';
import { API_CREATE_HOMEWORK, API_GRADE_INFO, API_LOGIN, API_REGISTER } from '@/constants/Apis';

interface CreateHomeworkData {
  level: number;
  major: string;
  title: string;
  start_time: string;
  end_time: string;
}

export default {
  name: 'CreateHomeworkDialog',
  props: {
    visible: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      gradeData: [],
      ruleForm: {
        title: '',
        grade: [],
        startTime: '',
        endTime: ''
      },
      rules: {
        grade: [{ required: true, type: 'array', min: 2, message: 'Please select grade', trigger: 'change' }],
        title: [{ required: true, message: 'Please fill in the title', trigger: 'blur' }],
        startTime: [
          {
            required: true,
            type: 'date',
            message: 'Please fill in the start time',
            trigger: 'blur'
          }
        ],
        endTime: [{ required: true, type: 'date', message: 'Please fill in the end time.', trigger: 'blur' }]
      }
    };
  },
  created() {
    sendGetRequest(API_GRADE_INFO()).then((result: Result) => {
      this.gradeData.push(result.data);
    });
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const body: CreateHomeworkData = {
            major: this.ruleForm.grade[1].toString(),
            level: parseInt(this.ruleForm.grade[0]),
            title: this.ruleForm.title,
            start_time: this.ruleForm.startTime,
            end_time: this.ruleForm.endTime
          };
          sendPostJsonRequest(API_CREATE_HOMEWORK(), body).then((result: Result) => {});
        }
      });
    }
  }
};
</script>

<style scoped>
/deep/ .ivu-modal-footer {
  border-top: none;
  padding-top: 0;
  padding-bottom: 16px;
}

/deep/ .ivu-modal-body {
  padding-bottom: 0;
}

/*/deep/ .ivu-modal {*/
/*top: 300px;*/
/*}*/
</style>
