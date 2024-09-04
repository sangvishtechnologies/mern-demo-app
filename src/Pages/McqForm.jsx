import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, Typography, Row, Col, DatePicker, TimePicker, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are included
import axios from 'axios'; // Import axios for HTTP requests

const { Option } = Select;
const { Title } = Typography;

const McqForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [questionCount, setQuestionCount] = useState(1); // Default to 1
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [questionForms, setQuestionForms] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Generate forms based on questionCount
    const forms = [];
    for (let i = 0; i < questionCount; i++) {
      forms.push(
        <div key={i}>
          <Form.Item
            name={`question${i}`}
            rules={[{ required: true, message: `Please input question ${i + 1}!` }]}
          >
            <Input placeholder={`Question ${i + 1}`} />
          </Form.Item>
          <Form.Item
            name={`optionA${i}`}
            rules={[{ required: true, message: `Please input option A for question ${i + 1}!` }]}
          >
            <Input placeholder={`Option A`} />
          </Form.Item>
          <Form.Item
            name={`optionB${i}`}
            rules={[{ required: true, message: `Please input option B for question ${i + 1}!` }]}
          >
            <Input placeholder={`Option B`} />
          </Form.Item>
          <Form.Item
            name={`optionC${i}`}
            rules={[{ required: true, message: `Please input option C for question ${i + 1}!` }]}
          >
            <Input placeholder={`Option C`} />
          </Form.Item>
          <Form.Item
            name={`optionD${i}`}
            rules={[{ required: true, message: `Please input option D for question ${i + 1}!` }]}
          >
            <Input placeholder={`Option D`} />
          </Form.Item>
        </div>
      );
    }
    setQuestionForms(forms);
  }, [questionCount]);

  const handleQuestionCountChange = (e) => {
    setQuestionCount(Number(e.target.value));
  };

  const handleChange = (info) => {
    if (info.fileList.length > 0) {
      setFileList(info.fileList);
    } else {
      setFileList([]);
    }
  };

  const handleNextStep = async () => {
    try {
      await form.validateFields(); // Validate current step fields
      if (currentStep === 0) {
        setCurrentStep(1);
      } else if (currentStep === 1 && currentQuestionIndex < questionCount - 1) {
        // Move to the next question set if there are more questions
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentStep === 1 && currentQuestionIndex === questionCount - 1) {
        // If on the last question set, move to the final step
        setCurrentStep(2);
      }
      setError(null);
    } catch (err) {
      setError('Please fill all required fields');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 1 && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentStep === 1 && currentQuestionIndex === 0) {
      setCurrentStep(0);
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setCurrentQuestionIndex(questionCount - 1); // Go back to the last question set
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Append technology and question data to formData
    formData.append('technology', values.technology);
    for (let i = 0; i < questionCount; i++) {
      formData.append(`question${i}`, values[`question${i}`]);
      formData.append(`optionA${i}`, values[`optionA${i}`]);
      formData.append(`optionB${i}`, values[`optionB${i}`]);
      formData.append(`optionC${i}`, values[`optionC${i}`]);
      formData.append(`optionD${i}`, values[`optionD${i}`]);
    }

    // Append schedule and files to formData
    formData.append('scheduleDate', values.scheduleDate.format('YYYY-MM-DD'));
    formData.append('scheduleTime', values.scheduleTime.format('HH:mm'));
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
      maxHeight: '90vh',
      overflowY: 'auto',
    }}>
      {currentStep === 0 && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleNextStep}
          style={{
            background: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Select Technology and Number of Questions
          </Title>
          <Form.Item
            name="technology"
            rules={[{ required: true, message: 'Please select a technology!' }]}
          >
            <Select placeholder="Select technology" style={{ width: '100%' }}>
              <Option value="html">HTML</Option>
              <Option value="css">CSS</Option>
              <Option value="react">React</Option>
              <Option value="angular">Angular</Option>
              <Option value="node">Node.js</Option>
              <Option value="db">Database</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            name="questionCount"
            rules={[{ required: true, message: 'Please input the number of questions!' }]}
          >
            <Input type="number" placeholder="Enter number of questions" onChange={handleQuestionCountChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Next</Button>
          </Form.Item>
        </Form>
      )}
      {currentStep === 1 && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleNextStep}
          style={{
            background: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Enter Questions and Options ({currentQuestionIndex + 1} of {questionCount})
          </Title>
          {questionForms[currentQuestionIndex]}
          <Form.Item style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button type="default" onClick={handlePreviousStep}>Previous</Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>
              {currentQuestionIndex === questionCount - 1 ? 'Next' : 'Next Question'}
            </Button>
          </Form.Item>
          {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        </Form>
      )}
      {currentStep === 2 && (
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
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Finalize and Submit
          </Title>
          <Form.Item
            name="scheduleDate"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="scheduleTime"
            rules={[{ required: true, message: 'Please select a time!' }]}
          >
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="finalOutput"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Upload
              name="finalOutput"
              listType="picture"
              showUploadList={{ showPreviewIcon: false }}
              onChange={handleChange}
              multiple={true}
              accept="image/*"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Button icon={<UploadOutlined />} style={{
                borderRadius: '4px',
                backgroundColor: '#1890ff',
                color: '#ffffff',
                borderColor: '#1890ff',
              }}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button type="default" onClick={handlePreviousStep}>Previous</Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>Submit</Button>
          </Form.Item>
          {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        </Form>
      )}
    </div>
  );
};

export default McqForm;
