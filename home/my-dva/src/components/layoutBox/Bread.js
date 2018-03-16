import React from 'react';
import { Layout, Menu, Icon, Breadcrumb, Switch } from 'antd';
function Bread () {
   return (
     <Breadcrumb separator=">" style={{float: 'left',paddingLeft:'20px',color:this.state.color}} className={this.state.color === '#fff'? 'bgB':'bgW'}>
     <Breadcrumb.Item style={{color:this.state.color}}>Home</Breadcrumb.Item>
     <Breadcrumb.Item href="" style={{color:this.state.color}}>Application Center</Breadcrumb.Item>
     </Breadcrumb>
   )
}
export  default  Bread;
