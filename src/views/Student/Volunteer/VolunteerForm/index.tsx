import { VolunteerFormData } from '..';
import * as React from 'react';
import { Input, Radio } from 'antd';
import * as style from './style.scss';
import { RadioChangeEvent } from 'antd/lib/radio';

const { Group, Button } = Radio;

export default function VolunteerForm({ volunteerFormData }: { volunteerFormData: [VolunteerFormData, React.Dispatch<React.SetStateAction<VolunteerFormData>>] }) {
  const [volunteerForm, setVolunteerForm] = volunteerFormData;
  const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const college = e.target.value;
    setVolunteerForm(oldValue => ({ ...oldValue, college }));
  }
  const handleIsObeyChange = (e: RadioChangeEvent) => {
    const isObey = e.target.value;
    setVolunteerForm(oldValue => ({ ...oldValue, isObey }));
  }
  const handleProfessionChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVolunteerForm(oldValue => {
      oldValue.professions[index] = value;
      return oldValue;
    });
  }
  return (
    <div className={style.form}>
      <div className={style.row}>
        <label className={style.label}>学校:</label>
        <Input value={volunteerForm.college} onChange={handleCollegeChange} className={style.input} />
      </div>
      <div className={style.row}>
        <label className={style.label}>调剂:</label>
        <Group value={volunteerForm.isObey} className={style.input} onChange={handleIsObeyChange}>
          <Button value={false}>不服从调剂</Button>
          <Button value={true}>服从调剂</Button>
        </Group>
      </div>
      <div className={style.row}>
        <label className={style.label}>专业:</label>
        <div className={style.input}>
          {volunteerForm.professions.map((val, key) => <Input value={val} key={key} onChange={handleProfessionChange(key)} />)}
        </div>
      </div>
    </div>
  )
}