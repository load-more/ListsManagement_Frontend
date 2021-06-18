<template>
<div>
  <el-drawer
    title="编辑列表信息"
    :visible.sync="isShowDrawer"
    :direction="rtl">
    <div class="drawer-content">
      <el-form
        ref='editListForm'
        :model='editListForm'
        :rules='editListRules'>
        <el-form-item
          label="列表名称"
          prop='title'
          label-width="80px">
          <el-input
            type='text'
            v-model="editListForm.title"
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
            v-model="editListForm.description"
            maxlength='300'
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="drawer-footer" style="padding-left:30px">
      <el-button
        type="primary"
        @click="saveEditListForm('editListForm')"
      >保存</el-button>
      <el-button @click="isShowDrawer=false">取消</el-button>
    </div>
  </el-drawer>
</div>
</template>

<script>
export default {
  name: 'EditList',
  data() {
    return {
      isShowDrawer: false,
      editListForm: {
        title: '',
        description: '',
      },
    }
  },
  methods: {
    saveEditListForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        this.isShowDrawer = false
        this.$message({
          message: '修改列表信息成功！',
          type: 'success',
        })
        return true
      })
    },
  },
  mounted() {
    this.$EventBus.$on('showEditListDrawer', () => {
      this.isShowDrawer = true
    })
  },
}
</script>

<style lang="scss" scoped>

</style>
