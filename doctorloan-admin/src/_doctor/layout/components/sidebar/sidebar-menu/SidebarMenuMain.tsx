/* eslint-disable react/jsx-no-target-blank */
import {Fragment} from 'react'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {MenuDto} from '@/types/Commons/menu.model'
import {useQuery} from 'react-query'
import {getMenus} from 'src/app/apis/Commons/common.api'
import {MenuItem} from '../../header/header-menus/MenuItem'
import {useAuth} from '../../../../../app/modules/auth'


// function setConfigRoles ({menus:any}) {
//   const {currentUser} = useAuth()
//   let _roleOption
//   switch (currentUser?.roleId) {
//     case 1: case 7:
//       _roleOption = menus;
//       break;
//     case 2: case 5:
//       break;
//     case 3: case 4:
//       _roleOption = menus.splice(3,4);
//       break;
//     case 6:
//       _roleOption = menus.splice(0,3)
//       break;
//     default:
//       _roleOption = menus.splice(0,1)
//   }
//   return _roleOption
// }

const SidebarMenuMain = () => {
  const {data: menus, isLoading} = useQuery([], () => getMenus())
  if (isLoading) return <>loading...</>
  const renderMenu = (menu: MenuDto) => {
    if (!menu.childs || menu.childs.length === 0)
      return <MenuItem title={menu.name} to={menu.url} fontIcon={menu.iconName} />
    return (
      <SidebarMenuItemWithSub fontIcon={menu.iconName} to='' title={menu.name}>
        {menu.childs.map((c, index) => {
          return <SidebarMenuItem key={index} to={c.url} title={c.name} fontIcon={c.iconName} />
        })}
      </SidebarMenuItemWithSub>
    )
  }
  // const menuItem = setConfigRoles(menus)
  return (
    <>
      {
        // menuItem?.data && menuItem.data.map((menu:any, index:any) => <Fragment key={index}>{renderMenu(menu)}</Fragment>)
        menus?.data && menus.data.map((menu:any, index:any) => <Fragment key={index}>{renderMenu(menu)}</Fragment>)
      }
    </>
  )
}

export {SidebarMenuMain}
