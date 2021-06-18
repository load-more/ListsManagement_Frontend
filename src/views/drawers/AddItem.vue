<template>
  <el-drawer
  title="添加子项"
  :visible.sync="addItemDrawer"
  direction="rtl"
  ref='addItemDrawer'>
  <div class="drawer-content">
    <el-form
      ref='addItemForm'
      :model='newItem'
      :rules='addItemRules'>
      <el-form-item
        label="子项名称"
        prop='title'
        label-width="80px">
        <el-input
          type='text'
          maxlength='30'
          show-word-limit
          autocomplete="off"
          v-model="newItem.title"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="子项描述"
        prop='description'
        label-width="80px">
        <el-input
          type='textarea'
          maxlength='300'
          show-word-limit
          v-model="newItem.description"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div class="drawer-footer" style="padding-left:30px">
    <el-button
      type="primary"
      @click="submitAddItemForm('addItemForm')"
    >提交</el-button>
    <el-button @click="addItemDrawer=false">取消</el-button>
  </div>
</el-drawer>
</template>

<script>
export default {
  name: 'AddItem',
  data() {
    return {
      addItemDrawer: false,
      addItemRules: {
        title: [
          { required: true, message: '请输入列表名称', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入列表描述信息', trigger: 'blur' },
        ],
      },
      newItem: {
        title: '',
        description: '',
      },
    }
  },
  methods: {
    submitAddItemForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        this.addItemDrawer = false
        this.$message({
          message: '添加列表成功！',
          type: 'success',
        });
        this.newItem.title = ''
        this.newItem.description = ''
        return true
      })
    },
  },
  mounted() {
    this.$EventBus.$on('showAddItemDrawer', () => {
      this.addItemDrawer = true
    })
  },
}
</script>

<style lang="scss" scoped>

</style>
