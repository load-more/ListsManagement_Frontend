<template>
  <div class='container'>
    <div class='header'>
      <span>你好，{{ nickname }}</span>
      <span class='quit' @click='logout'>退出</span>
    </div>
    <div class='content'>
      <div class='top'>
        <span>Lists Management System</span>
      </div>
      <el-collapse v-model='activeNames' style='height: 80vh'>
        <el-scrollbar style='height: 100%'>
          <el-collapse-item
            v-for='(item, index) in allData.lists'
            :title='item.title'
            :key='index'
            name='index'
          >
            <div class='buttons'>
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
                  @click='deleteList'
                  circle
                ></el-button>
              </el-tooltip>
            </div>
            <div class='list-description'>
              {{ item.description }}
            </div>
            <el-card
              class='box-card'
              v-for='(i, index) in item.items'
              :key='index'
            >
              <div slot='header' class='clearfix'>
                <span>{{ i.title }}</span>
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
                      @click='removeItem'
                      circle
                    ></el-button>
                  </el-tooltip>
                </div>
              </div>
              <div class='text item'>
                <p>{{ i.description }}</p>
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
import { getListRequest } from 'api/request';
import { mapState, mapMutations } from 'vuex';
import AddItem from './drawers/AddItem.vue';
import EditList from './drawers/EditList.vue';
import EditItem from './drawers/EditItem.vue';
import AddList from './drawers/AddList.vue';

export default {
  name: 'Home',
  computed: {
    ...mapState(['userid', 'username', 'nickname']),
  },
  data() {
    return {
      allData: {},
      activeNames: ['1'],
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
    deleteList() {
      this.$confirm('此操作将永久删除该列表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
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
    removeItem() {
      this.$confirm('此操作将永久删除该子项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
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
  },
  async created() {
    const temp = JSON.parse(
      JSON.stringify({
        userid: this.userid,
      }),
    );
    const rst = await getListRequest(temp);
    this.initLists({ allLists: rst.data.lists })
    this.allData = rst.data;
  },
  mounted() {
    this.$EventBus.$on('refresh', async () => {
      const temp = JSON.parse(
        JSON.stringify({
          userid: this.userid,
        }),
      );
      const rst = await getListRequest(temp);
      this.allData = rst.data;
    })
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
  position: relative;
  .header {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    span {
      padding: 5px 15px;
    }
    .quit {
      color: red;
      cursor: pointer;
    }
  }
  .content {
    width: 80%;
    position: absolute;
    left: 0;
    right: 0;
    top: 100px;
    bottom: 0;
    margin: auto;
  }
}
</style>
