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
import { addItemRequest } from 'api/request'
import { mapState } from 'vuex'

export default {
  name: 'AddItem',
  inject: ['reload'],
  computed: {
    ...mapState(['userid']),
  },
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
      listid: null,
    }
  },
  methods: {
    submitAddItemForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return false
        }
        const temp = JSON.parse(JSON.stringify(this.newItem))
        temp.userid = this.userid
        temp.listid = this.listid
        const res = await addItemRequest(temp)
        // 如果请求成功
        if (!res.errno) {
          this.addItemDrawer = false
          this.reload()
          this.$message({
            message: '添加子项成功！',
            type: 'success',
          });
          this.newItem.title = ''
          this.newItem.description = ''
          return true
        }
        // 如果请求失败
        this.addItemDrawer = false
        this.$message({
          message: '添加子项失败！',
          type: 'error',
        });
        return true
      })
    },
  },
  mounted() {
    this.$EventBus.$on('showAddItemDrawer', (listid) => {
      this.listid = listid
      this.addItemDrawer = true
    })
  },
}
</script>

<style lang="scss" scoped>

</style>
