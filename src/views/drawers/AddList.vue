<template>
<div>
  <el-drawer
    title="添加列表"
    :visible.sync="isShowDrawer"
    direction="rtl"
    ref='addListDrawer'>
    <div class="drawer-content">
      <el-form
        :model="addListForm"
        ref='addListForm'
        :rules='addListRules'>
        <el-form-item
          label="列表名称"
          prop='title'
          label-width="80px">
          <el-input
            type='text'
            v-model="addListForm.title"
            maxlength='30'
            show-word-limit
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="列表描述"
          prop='description'
          label-width="80px">
          <el-input
            type='textarea'
            v-model="addListForm.description"
            maxlength='300'
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="drawer-footer" style="padding-left:30px">
      <el-button
        type="primary"
        @click="submitAddListForm('addListForm')"
      >提交</el-button>
      <el-button @click="isShowDrawer=false">取消</el-button>
    </div>
  </el-drawer>
</div>
</template>

<script>
import { addListRequest } from 'api/request'
import { mapState } from 'vuex'

export default {
  name: 'AddList',
  data() {
    return {
      isShowDrawer: false,
      addListForm: {
        title: '',
        description: '',
      },
      addListRules: {
        title: [
          { required: true, message: '请填写名称', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请填写描述', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState(['userid']),
  },
  methods: {
    submitAddListForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return false
        }
        // 生成params
        const temp = JSON.parse(JSON.stringify(this.addListForm))
        temp.userid = this.userid
        // 获取请求结果
        const res = await addListRequest(temp)
        // 如果请求成功，刷新数据
        if (!res.errno) {
          this.isShowDrawer = false
          this.$EventBus.$emit('refresh')
          this.$message({
            message: '添加列表成功！',
            type: 'success',
          })
          this.addListForm.title = ''
          this.addListForm.description = ''
          return true
        }
        // 如果请求失败
        this.isShowDrawer = false
        this.$message({
          message: '添加列表失败！',
          type: 'error',
        })
        return true
      })
    },
  },
  mounted() {
    this.$EventBus.$on('showAddListDrawer', () => {
      this.isShowDrawer = true
    })
  },
}
</script>

<style lang="scss" scoped>

</style>
