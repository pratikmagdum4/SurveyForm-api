import axios from 'axios';
import { Form } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const getForms = async (page: number): Promise<Form[]> => {
  const response = await api.get(`/forms?page=${page}`);
  return response.data;
};

export const getForm = async (id: string): Promise<Form> => {
  const response = await api.get(`/forms/${id}`);
  return response.data;
};

export const createForm = async (formData: Partial<Form>): Promise<Form> => {
  const response = await api.post('/forms', formData);
  return response.data;
};

export const updateForm = async (id: string, formData: Partial<Form>): Promise<Form> => {
  const response = await api.put(`/forms/${id}`, formData);
  return response.data;
};

export const deleteForm = async (id: string): Promise<void> => {
  await api.delete(`/forms/${id}`);
};