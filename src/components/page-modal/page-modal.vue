<template>
  <div class="user-model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large" ref="formRef">
          <template v-for="item in modalConfig.formItems" :key="item.props">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间1"
                  end-placeholder="结束时间2"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystemStore from '@/store/main/system/system'
import type { ElForm } from 'element-plus/lib/components/index.js'
import type { IModalProps } from './type'

// interface IProps {
//   modalConfig: {
//     pageName: string
//     header: {
//       newTitle: string
//       editTitle: string
//     }
//     formItems: any[]
//   }
// }
const props = defineProps<IModalProps>()

const dialogVisible = ref(false)
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialData ?? ''
}
const formData = reactive<any>(initialData)

const isNewRef = ref(true)
const editData = ref()

const formRef = ref<InstanceType<typeof ElForm>>()
const systemStore = useSystemStore()

// 新建用户弹窗为空，编辑弹窗遍历itemData数据
function setModalVisible(isNew: boolean = true, itemData?: any) {
  formRef.value?.resetFields()
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

function handleConfirmClick() {
  dialogVisible.value = false

  let infoData = { ...formData }
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (!isNewRef.value && editData.value) {
    // 修改
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 创建
    systemStore.newPageListAction(props.modalConfig.pageName, infoData)
  }
}

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.user-model {
  color: skyblue;
}
</style>
