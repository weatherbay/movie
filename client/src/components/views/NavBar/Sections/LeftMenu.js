import React from 'react';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail" style={{ background:"grey"}}>
      <a href="/"><b>Home</b></a>
    </Menu.Item>
    <Menu.Item key="mail" style={{ background:"grey"}}>
      <a href="http://naijadiv.herokuapp.com/blog" target="_blank"><b>Blog</b></a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu