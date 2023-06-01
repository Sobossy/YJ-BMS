import { getEntireDepartments, getEntireMenus, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  isFold: boolean
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    isFold: false,
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const entireResult = await getEntireRoles()
      const departmentResult = await getEntireDepartments()
      const menuResult = await getEntireMenus()

      this.entireRoles = entireResult.data.list
      this.entireDepartments = departmentResult.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
