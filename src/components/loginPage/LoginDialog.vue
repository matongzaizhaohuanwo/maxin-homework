<template>
  <Modal
    ref="model"
    v-model="dialogVisible"
    :title="`${userType === 1 ? 'Teacher' : 'Student'} ${isLogin ? 'Login' : 'Register'}`"
    width="400"
    :mask-closable="false"
  >
    <Form v-show="isLogin" ref="loginRuleForm" :model="loginRuleForm" :rules="loginRules">
      <FormItem prop="id">
        <Input v-model="loginRuleForm.id" placeholder="Id">
          <Icon slot="prepend" type="ios-book-outline" />
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input v-model="loginRuleForm.password" placeholder="Password">
          <Icon slot="prepend" type="ios-lock-outline" />
        </Input>
      </FormItem>
      <FormItem>
        <Button @click="submitForm('loginRuleForm')" type="primary" long>Login</Button>
        <div style="height: 16px"></div>
        <Button @click="isLogin = false" long>No account? Register now!</Button>
      </FormItem>
    </Form>

    <Form v-show="!isLogin" ref="registerRuleForm" :model="registerRuleForm" :rules="registerRules">
      <FormItem prop="id">
        <Input v-model="registerRuleForm.id" placeholder="Id">
          <Icon slot="prepend" type="ios-book-outline" />
        </Input>
      </FormItem>
      <FormItem prop="name">
        <Input v-model="registerRuleForm.name" placeholder="Name">
          <Icon slot="prepend" type="ios-contact-outline" />
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input v-model="registerRuleForm.password" placeholder="Password">
          <Icon slot="prepend" type="ios-lock-outline" />
        </Input>
      </FormItem>
      <FormItem prop="grade">
        <Cascader :data="gradeData" v-model="registerRuleForm.grade" placeholder="Select your grade"></Cascader>
      </FormItem>
      <FormItem>
        <Button @click="submitForm('registerRuleForm')" type="primary" long>Register</Button>
        <div style="height: 16px"></div>
        <Button @click="isLogin = true" long>Already register? Login now!</Button>
      </FormItem>
    </Form>

    <div slot="footer"></div>
  </Modal>
</template>

<script lang="ts">
import Result, { sendGetRequest, sendPostJsonRequest } from '@/utils/NetWorkUtil';
import { API_GRADE_INFO, API_LOGIN, API_REGISTER } from '@/constants/Apis';
import StateCode from '@/constants/StateCode';
import { grade } from '@/constants/grade';

interface RegisterData {
  user_id: number;
  real_name: string;
  password: string;
  major: string;
  level: number;
  u_type: UserType;
}

export class UserType {
  static TEACHER: number = 1;
  static STUDENT: number = 2;
}

export default {
  name: 'LoginDialog',
  props: {
    visible: Boolean
  },
  data() {
    return {
      userType: UserType.STUDENT,
      gradeData: [],
      dialogVisible: false,
      isLogin: true,
      loginRuleForm: {
        id: '',
        password: ''
      },
      loginRules: {
        id: [{ required: true, message: 'Please fill in the id', trigger: 'blur' }],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          }
        ]
      },
      registerRuleForm: {
        id: '',
        name: '',
        password: '',
        grade: []
      },
      registerRules: {
        id: [{ required: true, message: 'Please fill in the id', trigger: 'blur' }],
        name: [
          {
            required: true,
            message: 'Please fill in the name',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          }
        ],
        grade: [
          {
            required: true,
            type: 'array',
            min: 2,
            message: 'Please select grade',
            trigger: 'change'
          }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.redirect) {
      this.$Message.warning({ content: 'please login', duration: 2 });
    }
    this.gradeData = grade;
  },
  methods: {
    show(type) {
      // this.isLogin = true;
      if (type === 'teacher') {
        this.userType = UserType.TEACHER;
      } else {
        this.userType = UserType.STUDENT;
      }
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === 'registerRuleForm') {
            const body: RegisterData = {
              user_id: parseInt(this.registerRuleForm.id),
              real_name: this.registerRuleForm.name,
              password: this.registerRuleForm.password,
              major: this.registerRuleForm.grade[1].toString(),
              level: parseInt(this.registerRuleForm.grade[0]),
              u_type: this.userType
            };
            sendPostJsonRequest(API_REGISTER(), body).then((result: Result) => {});
          } else {
            const body = {
              account_id: parseInt(this.loginRuleForm.id),
              password: this.loginRuleForm.password
            };
            sendPostJsonRequest(API_LOGIN(), body).then((result: Result) => {
              if (result.result === StateCode.SUCCESS) {
                this.$Message.success('登录成功');
                if (this.$route.query.redirect) {
                  this.$router.replace(this.$route.query.redirect);
                  return;
                }
                if (this.userType === UserType.TEACHER) {
                  this.$router.replace({ name: 'TeacherPage' });
                } else {
                  this.$router.replace({ name: 'StudentPage' });
                }
              } else {
                this.$Message.error(result.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped lanh="less">
/deep/ .ivu-modal-footer {
  border-top: none;
  padding-top: 0;
}

/deep/ .ivu-modal-body {
  padding-bottom: 0;
}
</style>
