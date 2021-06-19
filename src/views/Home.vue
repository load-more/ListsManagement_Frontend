<template>
  <div class='container'>
    <div class='header'>
      <span>你好，{{ nickname }}</span>
      <span class='quit' @click='logout'>退出</span>
    </div>
    <div class='content'>
      <div class='top'>
        Lists Management System
      </div>
      <el-collapse style='height: 80vh'>
        <el-scrollbar style='height: 100%'>
          <el-collapse-item
            v-for='(item, index) in allData.lists'
            :key='index'
          >
            <template slot="title">
              <span style="font-weight:bold;font-size:18px">
              {{ item.title }}
              </span>
              <div class='buttons' style="margin-left:30px">
                <el-tooltip effect='dark' content='添加子项' placement='top'>
                  <el-button
                    icon='el-icon-document-add'
                    size='mini'
                    @click="showDrawer('showAddItemDrawer',item.id)"
                    circle
                  ></el-button>
                </el-tooltip>
                <el-tooltip effect='dark' content='编辑列表' placement='top'>
                  <el-button
                    icon='el-icon-edit'
                    size='mini'
                    @click="showDrawer('showEditListDrawer',item.id)"
                    circle
                  ></el-button>
                </el-tooltip>
                <el-tooltip effect='dark' content='分享列表' placement='top'>
                  <el-button icon='el-icon-share' size='mini' circle></el-button>
                </el-tooltip>
                <el-tooltip effect='dark' content='删除列表' placement='top'>
                  <el-button
                    icon='el-icon-delete'
                    size='mini'
                    @click='deleteList(item.id)'
                    circle
                  ></el-button>
                </el-tooltip>
              </div>
            </template>
            <div class='list-description'>
              <p style="font-size:14px">
                描述：{{ item.description }}
              </p>
              <p style="font-size:12px;color:#666;">
                创建时间：{{ item.createdAt }}
                &nbsp;
                更新时间：{{ item.updatedAt }}
              </p>
            </div>
            <el-card
              class='box-card'
              v-for='(i, index) in item.items'
              :key='index'
            >
              <div slot='header' class='clearfix'>
                <span style="font-weight:bold;font-size:14px">
                  To do：{{ i.title }} &nbsp; ({{ i.status | getStatus }})
                </span>
                <div class='buttons' style='float: right; padding: 3px 0'>
                  <el-tooltip effect='dark' content='编辑子项' placement='top'>
                    <el-button
                      icon='el-icon-edit'
                      size='mini'
                      @click="showDrawer('showEditItemDrawer',i.id)"
                      circle
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip effect='dark' content='删除子项' placement='top'>
                    <el-button
                      icon='el-icon-delete'
                      size='mini'
                      @click='removeItem(i.id)'
                      circle
                    ></el-button>
                  </el-tooltip>
                </div>
              </div>
              <div class='text item'>
                <p>内容：{{ i.description }}</p>
              </div>
            </el-card>
          </el-collapse-item>
        </el-scrollbar>
        <div style='text-align: center'>
          <el-tooltip effect='dark' content='添加列表' placement='top'>
            <el-button
              icon='el-icon-plus'
              type='success'
              @click="showDrawer('showAddListDrawer')"
              circle
            ></el-button>
          </el-tooltip>
        </div>
      </el-collapse>
    </div>
    <add-item></add-item>
    <edit-list></edit-list>
    <edit-item></edit-item>
    <add-list></add-list>
  </div>
</template>

<script>
import { getListRequest, deleteListRequest, removeItemRequest } from 'api/request';
import { mapState, mapMutations } from 'vuex';
import AddItem from './drawers/AddItem.vue';
import EditList from './drawers/EditList.vue';
import EditItem from './drawers/EditItem.vue';
import AddList from './drawers/AddList.vue';

export default {
  name: 'Home',
  filters: {
    getStatus(value) {
      if (value === '0') {
        return '待完成'
      }
      if (value === '1') {
        return '已完成'
      }
      return '已删除'
    },
  },
  computed: {
    ...mapState(['userid', 'username', 'nickname']),
  },
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      allData: {},
      addItemDrawer: false,
      editListDrawer: false,
      editItemDrawer: false,
      showListForm: {
        title: '默认标题',
        description: '默认描述',
      },
      editListForm: {
        title: '默认标题',
        description: '默认描述',
      },
      createListForm: {
        title: '',
        description: '',
      },
    };
  },
  methods: {
    ...mapMutations(['initLists']),
    showDrawer(val, listid) {
      this.$EventBus.$emit(val, listid);
    },
    saveEditListForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.showListForm.title = this.editListForm.title;
        this.showListForm.description = this.editListForm.description;
        return true;
      });
    },
    deleteList(listid) {
      this.$confirm('此操作将永久删除该列表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteListRequest({ listid })
          this.reload()
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    removeItem(itemid) {
      this.$confirm('此操作将永久删除该子项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await removeItemRequest({ itemid })
          this.reload()
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    logout() {
      this.$confirm('确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        sessionStorage.removeItem('userid');
        this.$router.push('/');
        this.$message({
          type: 'success',
          message: '退出成功!',
        });
      })
    },
    async reload() {
      const rst = await getListRequest({
        userid: this.userid,
      });
      this.allData = rst.data;
      this.$forceUpdate()
    },
  },
  async created() {
    const rst = await getListRequest({
      userid: this.userid,
    });
    this.initLists({ allLists: rst.data.lists })
    this.allData = rst.data;
  },
  components: {
    AddItem,
    EditList,
    EditItem,
    AddList,
  },
};
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  .header {
    height: 5vh;
    display: flex;
    background-color: #12aa9c;
    justify-content: space-between;
    span {
      color: #fff;
      padding: 5px 15px;
    }
    .quit {
      color: red;
      cursor: pointer;
    }
  }
  .content {
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .top {
      text-align: center;
    }
    width: 95%;
    height: 92vh;
    box-sizing: border-box;
    padding: 0 20px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 2px solid black;
    .list-description {
      background-color: rgb(223, 223, 223);
    }
  }
}
</style>
