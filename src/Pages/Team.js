import React, { useState } from 'react';
import { Form, Input, Button, Upload, Select, Typography, Row, Col, DatePicker, TimePicker, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are included
import axios from 'axios'; // Import axios for HTTP requests

const { Option } = Select;
const { Title } = Typography;

const App = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    if (info.fileList.length > 0) {
      setFileList(info.fileList);
    } else {
      setFileList([]);
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    
    // Append text fields to formData
    Object.keys(values).forEach(key => {
      if (key !== 'finalOutput') {
        formData.append(key, values[key]);
      }
    });

    // Append files to formData
    fileList.forEach(file => {
      formData.append('files', file.originFileObj);
    });

    try {
      // Replace with your actual endpoint
      const response = await axios.post('http://localhost:3000/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Form submitted successfully!');
    } catch (error) {
      message.error('Error submitting form!');
    }
  };

  return (
    <div style={{
      width: '80%',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      maxHeight: '90vh', // Maximum height of the container
      overflowY: 'auto', // Scroll if content overflows
    }}>
      <Title level={2} style={{
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '28px',
        fontWeight: '700',
        color: '#333',
        position: 'relative',
        display: 'inline-block',
      }}>
        Task Form
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: '-5px',
          width: '50%',
          height: '2px',
          backgroundColor: '#1890ff',
          transition: 'width 0.3s ease',
          transform: 'translateX(-50%)',
        }} />
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          background: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: 'Please input the title!' }]}
              style={{ marginBottom: '50px' }}
            >
              <Input placeholder="Enter title" style={{
                borderRadius: '4px',
                borderColor: '#add8e6', // Light blue border
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'Roboto, sans-serif',
                transition: 'border-color 0.3s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                width: 'calc(100% - 20px)', // Decrease width by 10px on each side
              }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="question"
              rules={[{ required: true, message: 'Please input the question!' }]}
              style={{ marginBottom: '50px' }}
            >
              <Input.TextArea placeholder="Enter question" rows={4} style={{
                borderRadius: '4px',
                borderColor: '#add8e6', // Light blue border
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'Roboto, sans-serif',
                transition: 'border-color 0.3s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                width: 'calc(100% - 20px)', // Decrease width by 10px on each side
              }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="batch"
              rules={[{ required: true, message: 'Please select the batch!' }]}
              style={{ marginBottom: '50px', height: '40px' }}
            >
              <Select
                mode="multiple"
                placeholder="Select batch"
                style={{
                  borderRadius: '4px',
                  backgroundColor: '#add8e6', // Light blue border
                  fontSize: '16px',
                  fontFamily: 'Roboto, sans-serif',
                  transition: 'border-color 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  width: 'calc(100% - 20px)', // Decrease width by 10px on each side
                  height: '40px',
                }}
                dropdownRender={(menu) => (
                  <div style={{ padding: '8px 0' }}>
                    {menu}
                  </div>
                )}
              >
                <Option value="july">July</Option>
                <Option value="march">March</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              rules={[{ required: true, message: 'Please select the role!' }]}
              style={{ marginBottom: '50px' }}
            >
              <Select
                mode="multiple"
                placeholder="Select role"
                style={{
                  borderRadius: '4px',
                  borderColor: '#add8e6', // Light blue border
                  fontSize: '16px',
                  fontFamily: 'Roboto, sans-serif',
                  transition: 'border-color 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  width: 'calc(100% - 20px)', // Decrease width by 10px on each side
                  height: '40px',
                }}
                dropdownRender={(menu) => (
                  <div style={{ padding: '8px 0' }}>
                    {menu}
                  </div>
                )}
              >
                <Option value="developer">Developer</Option>
                <Option value="designer">Designer</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="technology"
              rules={[{ required: true, message: 'Please select the technology!' }]}
              style={{ marginBottom: '50px' }}
            >
              <Select
                mode="multiple"
                placeholder="Select technology"
                style={{
                  borderRadius: '4px',
                  borderColor: '#add8e6', // Light blue border
                  fontSize: '16px',
                  fontFamily: 'Roboto, sans-serif',
                  transition: 'border-color 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  width: 'calc(100% - 20px)', // Decrease width by 10px on each side
                  height: '40px',
                }}
                dropdownRender={(menu) => (
                  <div style={{ padding: '8px 0' }}>
                    {menu}
                  </div>
                )}
              >
                <Option value="react">React</Option>
                <Option value="vue">Vue</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="finalOutput"
              rules={[{ required: true, message: 'Please upload images!' }]}
              style={{ marginBottom: '50px' }}
            >
              <Upload
                name="finalOutput"
                listType="picture"
                className="upload-list-inline"
                showUploadList={{ showPreviewIcon: false }}
                onChange={handleChange}
                multiple={true}
                accept="image/*"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Button icon={<UploadOutlined />} style={{
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontFamily: 'Roboto, sans-serif',
                  backgroundColor: '#1890ff',
                  color: '#fff',
                  borderColor: '#1890ff',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  height: '40px'
                }}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="scheduleDate"
              style={{ marginBottom: '50px' }}
            >
              <DatePicker style={{
                borderRadius: '4px',
                borderColor: '#add8e6', // Light blue border
                fontSize: '16px',
                fontFamily: 'Roboto, sans-serif',
                transition: 'border-color 0.3s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                width: 'calc(100% - 20px)', // Decrease width by 10px on each side
                height: '40px'
              }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="scheduleTime"
              style={{ marginBottom: '50px' }}
            >
              <TimePicker style={{
                borderRadius: '4px',
                borderColor: '#add8e6', // Light blue border
                fontSize: '16px',
                fontFamily: 'Roboto, sans-serif',
                transition: 'border-color 0.3s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                width: 'calc(100% - 20px)', // Decrease width by 10px on each side
                height: '40px'
              }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" style={{
            borderRadius: '4px',
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
          }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
