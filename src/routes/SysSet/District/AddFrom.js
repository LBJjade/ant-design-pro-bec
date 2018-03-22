/* eslint-disable indent,no-unused-vars,no-undef,no-trailing-spaces,react/no-multi-comp,react/jsx-boolean-value,max-len,prefer-destructuring,padded-blocks,react/no-unused-state,react/sort-comp */
import React, { PureComponent } from 'react';
import { Input, Modal, Form, Upload, Icon, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const SelectOption = Select.Option;


const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class App extends React.Component {
  state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  }
  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }
  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
  }
  render() {
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    return (
      <div>
        <Select defaultValue={provinceData[0]} style={{ width: 90 }} onChange={this.handleProvinceChange}>
          {provinceOptions}
        </Select>
        <Select value={this.state.secondCity} style={{ width: 90 }} onChange={this.onSecondCityChange}>
          {cityOptions}
        </Select>
      </div>
    );
  }
}
@Form.create()
export default class CreateAddForm extends PureComponent {
  constructor(props) {
    super(props);
    const { pro } = props;
    this.state = {
      modalVisible: props.modalVisible,
      handleAdd: props.handleAdd,
      handleModalVisible: props.handleModalVisible,
      form: props.form,
    };
  }

  render() {
    const okHandle = () => {
      this.state.form.validateFields((err, fieldsValue) => {
        if (err) return;
        this.state.handleAdd(fieldsValue);
      });
    };
    const { getFieldDecorator } = this.props.form;
    const modalVisible = this.props.modalVisible;
    const results = this.props.option;

  return (

    <Modal
      title="新增"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => this.state.handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="小区名称"
      >
        {getFieldDecorator('districtName', {
          rules: [{ required: true, message: '请输入小区名称...' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="关联品牌"
      >
        {getFieldDecorator('brandName', {
          rules: [{ required: true, message: '请选择关联品牌...' }],
        })(
          <Select
            placeholder="请选择"
            style={{ width: '100%' }}
          >
            {results.map(d => <SelectOption key={d.objectId} value={d.brandName} >{d.brandName}</SelectOption>)}
          </Select>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="关联大区"
      >
        {getFieldDecorator('districtName', {
          rules: [{ required: true, message: '请选择关联大区...' }],
        })(
          <Select defaultValue="lucy" style={{ width: 120 }} >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="关联城市"
      >
        {getFieldDecorator('districtName', {
          rules: [{ required: true, message: '请选择关联城市...' }],
        })(
          <App />
        )}
      </FormItem>
    </Modal>
  );
 }
}
