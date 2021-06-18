<template>
<div>
    <el-drawer
      title="添加子项"
      :visible.sync="addItemDrawer"
      :direction="direction"
      ref='addItemDrawer'
      :before-close="handleClose">
      <div class="drawer-content">
        <el-form
          :model="createListForm"
          ref='createListForm'
          :rules='createListRules'>
          <el-form-item
            label="子项名称"
            prop='title'
            :label-width="formLabelWidth">
            <el-input
              type='text'
              v-model="createListForm.title"
              maxlength='30'
              show-word-limit
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="子项描述"
            prop='description'
            :label-width="formLabelWidth">
            <el-input
              type='textarea'
              v-model="createListForm.description"
              maxlength='300'
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="drawer-footer" style="padding-left:30px">
        <el-button
          type="primary"
          @click="submitCreateListForm('createListForm')"
        >提交</el-button>
        <el-button @click="createListDrawer=false">取消</el-button>
      </div>
    </el-drawer>
</div>
</template>

<script>
export default {
  name: 'AddItem',
}
</script>

<style lang="scss" scoped>

</style>
