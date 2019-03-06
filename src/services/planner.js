import axios from 'axios';
import qs from 'qs';
import { prettifyCourseName } from '../utils/courseName';
// PROD
// https://api.ezplanner.mochahub.io/plan
// DEV
// http://api.ezplanner-sandbox.mochahub.io
const api = axios.create({
  baseURL: 'http://api.ezplanner-sandbox.mochahub.io',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

const generateFlowUrl = courseName =>
  `https://uwflow.com/course/${courseName.toString().toLowerCase()}`;

export const plan_eligible = async (courses = []) =>
  api.get('/plan', {
    params: {
      course: courses || []
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    transformResponse: [
      response =>
        // data.plan.courses.eligible
        (Array.isArray(response.data.plan.courses.eligible)
          ? response.data.plan.courses.eligible
          : []
        ).map(item => [
          prettifyCourseName(item.name),
          item.title,
          generateFlowUrl(item.name)
        ])
    ],
    responseType: 'json'
  });

// Def a more efficient way then to make two seperate functions
export const plan_free = async (courses = []) =>
  api.get('/plan', {
    params: {
      course: courses || []
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    transformResponse: [
      response =>
        (Array.isArray(response.data.plan.courses.free)
          ? response.data.plan.courses.free
          : []
        ).map(item => [
          prettifyCourseName(item.name),
          item.title,
          generateFlowUrl(item.name)
        ])
    ],
    responseType: 'json'
  });
