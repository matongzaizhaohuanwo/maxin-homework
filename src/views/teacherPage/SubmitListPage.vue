<template>
    <div>
        <Button style="margin-bottom: 16px" @click="back">Back</Button>

        <Table class="table" :columns="columns" :data="data" disabled-hover border>
            <div slot-scope="{ row }" slot="upload_time">
                {{ getTimeGMT(row.upload_time) }}
            </div>
            <template slot-scope="{ row, index }" slot="upload_time">
                <Button type="error" size="small" @click="remove(index)">Delete</Button>
            </template>
        </Table>
        <create-homework-dialog ref="$createHomeworkDialog"/>
    </div>
</template>

<script>
    import {getTimeGMT} from '@/utils/TimeUtil';
    import {sendGetRequest} from '@/utils/NetWorkUtil';
    import {API_HOMEWORK_LIST, API_SUBMIT_LIST} from '@/constants/Apis';
    import CreateHomeworkDialog from '@/components/teacherPage/CreateHomeworkDialog';

    export default {
        components: {CreateHomeworkDialog},
        data() {
            return {
                getTimeGMT: getTimeGMT,
                columns: [
                    {
                        title: '#',
                        key: 'work_id'
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
                    }
                ],
                data: []
            };
        },
        mounted() {
            const body = {offset: 0, limit: 5, homework_id: parseInt(this.$route.params.id)};
            sendGetRequest(API_SUBMIT_LIST(), body).then(result => {
                this.data = result.data.Works;
                this.data = [{
                    work_id: 1,
                    creator_id: 0,
                    score: 0,
                    grade_id: 0,
                    homework_id: 0,
                    creator: "王炳琪",
                    title: "方案",
                    comment: "很好",
                    upload_time: "2019-11-21T11:21:29+08:00"
                },{
                    work_id: 1,
                    creator_id: 0,
                    score: 10,
                    grade_id: 0,
                    homework_id: 0,
                    creator: "马鑫",
                    title: "方案",
                    comment: "很好",
                    upload_time: "2019-11-21T11:21:29+08:00"
                }]
            });
        },
        methods: {
            back() {
                this.$router.back();
            }
        }
    };
</script>

<style scoped lang="less"></style>
