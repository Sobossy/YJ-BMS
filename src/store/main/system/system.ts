import {
  deletePageById,
  deleteUsersById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'

// interface ISystemState {
//   usersList: any[]
//   usersTotalCount: number
// }

const useSystemStore = defineStore('system', {
  state: () => ({
    usersList: <any>[],
    usersTotalCount: 0,

    pageList: <any>[],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const userListResult = await postUsersListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUsersByIdAction(id: number) {
      const deleteResult = await deleteUsersById(id)
      console.log(deleteResult)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUsersListAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      console.log(newResult)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // 针对页面的数据请求
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageListAction(pageName: string, userInfo: any) {
      const newResult = await newPageData(pageName, userInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
