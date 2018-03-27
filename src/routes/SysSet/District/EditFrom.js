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
export default class CreateEditForm extends PureComponent {
  constructor(props) {
    super(props);
    const { pro } = props;
    this.state = {
      modalEditVisible: props.modalEditVisible,
      handleEdit: props.handleEdit,
      handleModalVisible: props.handleModalVisible,
      form: props.form,
    };
  }

  render() {
    const okHandle = () => {
      this.state.form.validateFields((err, fieldsValue) => {
        if (err) return;
        this.state.handleEdit(fieldsValue);
      });
    };
    const { getFieldDecorator } = this.props.form;
    const modalEditVisible = this.props.modalEditVisible;
    const results = this.props.option;
    const results2 = this.props.option2;

  return (

    <Modal
      title="编辑"
      visible={modalEditVisible}
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
        {getFieldDecorator('regionName', {
          rules: [{ required: true, message: '请选择关联大区...' }],
        })(
          <Select
            placeholder="请选择"
            style={{ width: '100%' }}
          >
            {results2.map(d => <SelectOption key={d.objectId} value={d.regionName} >{d.regionName}</SelectOption>)}
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
