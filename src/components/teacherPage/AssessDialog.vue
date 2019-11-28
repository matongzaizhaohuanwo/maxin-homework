<template>
  <Modal ref="model" v-model="dialogVisible" title="Assess Homework" width="450" :mask-closable="false">
    <Form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="top">
      <FormItem prop="score" label="Score">
        <Input v-model="ruleForm.score" placeholder="Score" />
      </FormItem>
      <FormItem prop="comment" label="Comment">
        <Input v-model="ruleForm.comment" placeholder="Comment" type="textarea" :rows="10" />
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
import { API_COMMENT, API_CREATE_HOMEWORK, API_GRADE_INFO, API_LOGIN, API_REGISTER } from '@/constants/Apis';
import StateCode from '../../constants/StateCode';

interface AssessDialog {
  level: number;
  major: string;
  title: string;
  start_time: string;
  end_time: string;
}

export default {
  name: 'AssessDialog',
  props: {
    visible: Boolean
  },
  data() {
    return {
      workId: 0,
      dialogVisible: false,
      ruleForm: {
        score: '',
        comment: ''
      },
      rules: {
        score: [{ required: true, message: 'Please fill in the score', trigger: 'blur' }]
      }
    };
  },
  methods: {
    show(id) {
      this.workId = id;
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const body = {
            comment: this.ruleForm.comment,
            score: parseInt(this.ruleForm.score),
            work_id: parseInt(this.workId)
          };
          sendPostJsonRequest(API_COMMENT(), body).then((result: Result) => {
            if (result.result === StateCode.SUCCESS) {
              this.$Message.success('success');
              this.hide();
            } else {
              this.$Message.error(result.message);
            }
          });
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
</style>
