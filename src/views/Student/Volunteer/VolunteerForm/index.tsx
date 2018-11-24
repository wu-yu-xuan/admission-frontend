import { VolunteerFormData } from '..';
import * as React from 'react';
import { Input } from 'antd';
import * as style from './style.scss';

export default function VolunteerForm({ volunteerFormData }: { volunteerFormData: [VolunteerFormData, React.Dispatch<React.SetStateAction<VolunteerFormData>>] }) {
  const [volunteerForm, setVolunteerForm] = volunteerFormData;
  const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolunteerForm(oldValue => ({ ...oldValue, college: e.target.value }));
  }
  return (
    <div className={style.form}>
      <label>学校:</label>
      <Input value={volunteerForm.college} onChange={handleCollegeChange} />
    </div>
  )
}