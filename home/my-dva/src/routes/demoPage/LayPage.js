import React, {Component} from 'react'
import { Layout, Menu, Icon, Select, Input, Form, Button,Table ,Pagination} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

let tempID=0
let data=[], rowID=[], total;
let page=1

let yearData=[], newYear = new Date().getFullYear();  //年度输入框年数据，获取当前年份
for (var i = newYear-10; i < newYear+1; i++) {
  yearData.push(<Option key={i} value={i.toString()}> {i}年度 </Option>)
}
let submitYear = newYear;
const columns = [{
  title: '组织名称',
  dataIndex: 'title',
}, {
  title: '组织类型',
  dataIndex: 'type',
  render: (text,record)=> text==1?<span>党</span>:text==2?<span>政</span>:text==3?<span>会</span>:<span>议</span>
}, {
  title: '年度',
  dataIndex: 'year',
}, {
  title: '政治理论学习场次',
  dataIndex: 'study',
}, {
  title: '党政联席会议场次',
  dataIndex: 'gov_meet',
}, {
  title: '党组织支部会议场次',
  dataIndex: 'party_meet',
}, {
  title: '党组织支部会议场次',
  dataIndex: 'talk',
}, {
  title: '操作',
  dataIndex: 'rect',
  render: ()=> <Button>管理</Button>,
}];
class LayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getList();
  }
  //获取列表数据
  getList = ()=>{
    var orgLifeData = this.props.form.getFieldsValue();
    //console.log(orgLifeData.theme);
    var url = 'http://od.zemcho.com/console/od/Meeting/otherLife';
    var params = new FormData();
    params.append("page",page);
    params.append("page_rows",8);
    params.append("year", submitYear);
    if (tempID != '-1' && tempID != 0) {
      params.append("or_type", tempID);
    }
    if (orgLifeData.theme != undefined) {
      params.append("search", orgLifeData.theme);
    }

    //发起请求
    var response = fetch( url, {
      method: 'post',
      headers: {},
      body: params,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((json) => {
      console.log(json);
      //console.log(JSON.stringify(json));
      data = [];
      if (json.code == 200) {
        total = json.info.total;
        for ( let i = 0; i < json.info.list.length; i++) {
          data.push({
            key: json.info.list[i].id,
            id: json.info.list[i].id,
            study: json.info.list[i].study,
            gov_meet: json.info.list[i].gov_meet,
            party_meet: json.info.list[i].party_meet,
            talk: json.info.list[i].talk,
            title: json.info.list[i].title,   //党组织
            type: json.info.list[i].type,    //党组织类型
            year: json.info.list[i].year,    //年份
          })
        }
        this.setState({'user': data})
      }else if (json.code == 400) {
        message.success(json.message);
        this.setState({'user':json})
      }
    }).catch((error) => {
      console.error( error );
    });

  }

  handleChange(value) {
    submitYear = value;
    this.getList();
    console.log(`selected ${value}`);
  }
  onChange(page) {

  }
    render() {
    const { getFieldDecorator } = this.props.form;
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
      };
      return (
             <div style={{padding: '50px'}}>
                <h5>2017年度各党组织其他组织生活情况</h5>
                <div>
                  <span style={{ float: 'left' }}>筛选：</span>
                  <Form onSubmit={this.handleSubmit} className="" style={{ float: 'left' }}>
                    <FormItem style={{ width: 120,marginLeft: '20px',float:'left' }}>
                      {getFieldDecorator('year', {
                        initialValue: newYear + '年度'
                      })(
                        <Select  onChange={this.handleChange.bind(this)}>
                          {yearData}
                        </Select>
                      )}
                    </FormItem>
                    <FormItem style={{ width: 120,marginLeft: '20px',float:'left' }}>
                      { getFieldDecorator( 'title')(
                        <Select  onChange={this.handleChange} placeholder="请输入党组织">
                          <Option value="-1">所有</Option>
                          <Option value="1">党委</Option>
                          <Option value="2">党总支</Option>
                          <Option value="3">直属党支部</Option>
                          <Option value="4">分党委下系党总支</Option>
                          <Option value="5">党支部</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Form>
                  <FormItem  style={{float:'right',width:'120px'}}>
                    { getFieldDecorator( 'theme')(
                      <Input placeholder="请输入党组织"/>
                    )}
                  </FormItem>
                  <FormItem style={{float:'right'}}>
                    <Button type="primary" htmlType="submit" onClick={this.getList}>检索</Button>
                  </FormItem>
                  <Button type="primary"  size="large" style={{float:'right'}}>导出</Button>

                </div>
               <div style={{'clear':'both'}}></div>
               <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
               <Pagination onChange={this.onChange} total={total} pageSize={8} />
             </div>
        )
}
}

export default LayPage = Form.create()(LayPage);
