// client/src/services/api.js
import axios from 'axios';

// अपने बैकएंड सर्वर का URL यहाँ सेट करें
const API_URL = 'http://localhost:5000/api'; // सुनिश्चित करें कि यह आपके सर्वर के पोर्ट से मैच करता है

const api = axios.create({
  baseURL: API_URL,
});

// सभी पोस्ट्स प्राप्त करने के लिए फंक्शन
export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error.response?.data || error.message);
    throw error; // एरर को आगे प्रोपगेट करें ताकि कंपोनेंट इसे हैंडल कर सके
  }
};

// नया पोस्ट बनाने के लिए फंक्शन (FormData का उपयोग करके)
export const createPost = async (formData) => {
  try {
    // FormData भेजते समय Content-Type को 'multipart/form-data' पर सेट करना महत्वपूर्ण है
    // Axios इसे FormData ऑब्जेक्ट डिटेक्ट होने पर अपने आप कर देता है
    const response = await api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error.response?.data || error.message);
    throw error; // एरर को आगे प्रोपगेट करें
  }
};

// आप यहाँ अन्य API कॉल्स (जैसे deletePost, updatePost) भी जोड़ सकते हैं