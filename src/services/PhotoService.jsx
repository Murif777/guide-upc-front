import { request } from '../helpers/axios_helper';

export const uploadPhoto = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await request(
      'POST',
      '/api/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    console.log('File uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw error;
  }
};
