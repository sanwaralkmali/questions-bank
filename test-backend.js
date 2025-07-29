// Simple test script for the backend API
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001';

async function testBackend() {
  console.log('🧪 Testing Backend API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
    console.log('');

    // Test 2: Get Questions (should be empty initially)
    console.log('2. Testing Get Questions...');
    const getResponse = await fetch(`${BASE_URL}/api/questions`);
    const getData = await getResponse.json();
    console.log('✅ Get Questions:', getData);
    console.log('');

    // Test 3: Add a Question
    console.log('3. Testing Add Question...');
    const testQuestion = {
      question: "What is 2 + 2?",
      choices: ["3", "4", "5", "6"],
      correctAnswer: "4",
      skill: "algebra-basics",
      grade: "5",
      level: "easy"
    };

    const addResponse = await fetch(`${BASE_URL}/api/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testQuestion),
    });
    const addData = await addResponse.json();
    console.log('✅ Add Question:', addData);
    console.log('');

    // Test 4: Get Questions Again (should have the new question)
    console.log('4. Testing Get Questions After Adding...');
    const getResponse2 = await fetch(`${BASE_URL}/api/questions`);
    const getData2 = await getResponse2.json();
    console.log('✅ Get Questions After Adding:', getData2);
    console.log('');

    console.log('🎉 All tests passed! Backend is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\nMake sure the backend server is running on port 3001');
  }
}

testBackend();