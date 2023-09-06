/* eslint-disable react/jsx-no-target-blank */
import {Fragment} from 'react'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {MenuDto} from '@/types/Commons/menu.model'
import {useQuery} from 'react-query'
import {getMenus} from 'src/app/apis/Commons/common.api'
import {MenuItem} from '../../header/header-menus/MenuItem'

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
  return (
    <>
      {menus?.data &&
        menus.data.map((menu, index) => <Fragment key={index}>{renderMenu(menu)}</Fragment>)}
    </>
  )
}

export {SidebarMenuMain}
