<template>
<div>
  <el-drawer
    title="编辑子项信息"
    :visible.sync="isShowDrawer"
    direction="rtl">
    <div class="drawer-content">
      <el-form
        ref='editItemForm'
        :model='editItemForm'
        :rules='editItemRules'>
        <el-form-item
          label="子项名称"
          prop='title'
          label-width="80px">
          <el-input
            type='text'
            v-model="editItemForm.title"
            maxlength='30'
            show-word-limit
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="子项描述"
          prop='description'
          label-width="80px">
          <el-input
            type='textarea'
            v-model="editItemForm.description"
            maxlength='300'
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="drawer-footer" style="padding-left:30px">
      <el-button
        type="primary"
        @click="saveEditItemForm('editItemForm')"
      >保存</el-button>
      <el-button @click="isShowDrawer=false">取消</el-button>
    </div>
  </el-drawer>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { editItemRequest } from 'api/request'

export default {
  name: 'EditItem',
  computed: {
    ...mapState(['allLists']),
  },
  data() {
    return {
      isShowDrawer: false,
      editItemForm: {
        itemid: null,
        status: 0,
        title: '',
        description: '',
      },
      editItemRules: {
        title: [
          { required: true, message: '子项名称不能为空', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '子项描述不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    saveEditItemForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        this.isShowDrawer = false
        const res = editItemRequest(this.editItemForm)
        if (!res.errno) {
          this.$EventBus.$on('refresh')
          this.$message({
            message: '修改子项信息成功！',
            type: 'success',
          });
          return true
        }
        this.$message({
          message: '修改子项信息失败！',
          type: 'error',
        });
        return true
      })
    },
  },
  mounted() {
    this.$EventBus.$on('showEditItemDrawer', (itemid) => {
      console.log(this.allLists);
      this.allLists.forEach((list) => {
        list.items.forEach((item) => {
          if (item.id === itemid) {
            this.editItemForm.itemid = itemid
            this.editItemForm.title = item.title
            this.editItemForm.description = item.description
          }
        })
      })
      this.isShowDrawer = true
    })
  },
}
</script>

<style lang="scss" scoped>

</style>
