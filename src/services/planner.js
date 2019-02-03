import axios from 'axios';
import qs from 'qs';
import { prettifyCourseName } from '../utils/courseName';

const api = axios.create({
  baseURL: 'https://ezplanner-flask-api.herokuapp.com/api',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

const generateFlowUrl = courseName =>
  `https://uwflow.com/course/${courseName.toString().toLowerCase()}`;

export const plan = async (courses = []) =>
  api.get('/planner', {
    params: {
      course: courses || []
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    transformResponse: [
      data =>
        (Array.isArray(data) ? data : []).map(([course, title]) => [
          prettifyCourseName(course),
          title,
          generateFlowUrl(course)
        ])
    ],
    responseType: 'json'
  });

//re.split(r'(^[^\d]+)', string)[1:]
