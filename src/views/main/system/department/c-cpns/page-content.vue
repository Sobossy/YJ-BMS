<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="newUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />

        <el-table-column align="center" label="部门名称" prop="name" width="150px" />
        <el-table-column align="center" label="部门领导" prop="leader" width="150px" />
        <el-table-column align="center" label="上级部门" prop="parentId" width="150px" />
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">{{ formatUTC(scope.row.createAt) }}</template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">{{ formatUTC(scope.row.updateAt) }}</template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button size="small" icon="Edit" type="primary" text @click="editClick(scope.row)">
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              title="确定删除？"
              @confirm="confirmBtn(true)"
              @cancel="confirmBtn(false)"
            >
              <template #reference>
                <el-button
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="deleteBtn(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const emit = defineEmits(['newClick', 'editClick'])

// 获取列表数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 页码相关
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 发送网络请求，获取列表信息
function fetchPageListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  // console.log(pageInfo)

  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction('department', queryInfo)
}

// 删除
let byId: number
function deleteBtn(id: number) {
  byId = id
  console.log(id, byId)
}
function confirmBtn(confirm: boolean) {
  if (confirm) {
    systemStore.deletePageByIdAction('department', byId)
    console.log('删除成功')
  }
}

// 新建用户
function newUserClick() {
  emit('newClick', true)
}

// 编辑用户
function editClick(itemData: any) {
  // console.log(itemData)
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.user-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
