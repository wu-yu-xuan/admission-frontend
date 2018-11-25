import * as React from 'react';
import ContentTitle from 'src/components/ContentTitle';
import ajax, { Code } from 'src/utility/ajax';
import { Icon, Button, message } from 'antd';
import * as style from './style.scss';
import VolunteerForm from './VolunteerForm';

export interface VolunteerFormData {
  college: string;
  professions: string[];
  isObey: boolean;
}

export default function Volunteer() {
  const forbidden = useForbidden();
  const volunteerForms = [useVolunteerForm(), useVolunteerForm(), useVolunteerForm(), useVolunteerForm(), useVolunteerForm()];
  const [success, handleSubmit] = useSubmit(volunteerForms.map(val => val[0]));

  if (forbidden) {
    return (
      <>
        <ContentTitle>填报志愿</ContentTitle>
        <p className={style.forbidden}>
          <Icon type="warning" className={style.icon} />
          尚未到填报志愿的时间或已经截止
        </p>
      </>
    )
  }

  if (success) {
    return (
      <>
        <ContentTitle>填报志愿</ContentTitle>
        <p className={style.success}>
          <Icon type="check-circle" className={style.icon} />
          志愿已提交成功
        </p>
      </>
    )
  }
  
  const buttonDisabled = !volunteerForms.every(value => isVolunteerFormDataValid(value[0]));
  return (
    <>
      <ContentTitle>填报志愿</ContentTitle>
      <form onSubmit={handleSubmit}>
        <div className={style.flexContainer}>
          {volunteerForms.map((value, key) => <VolunteerForm key={key} volunteerFormData={value} />)}
        </div>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          disabled={buttonDisabled}
          title={buttonDisabled ? '请填写所有信息' : '提交志愿'}
        >
          提交
       </Button>
      </form>
    </>
  )
}

function useSubmit(volunteerForms: VolunteerFormData[]): [boolean, (e: React.FormEvent<HTMLFormElement>) => Promise<void>] {
  const [success, setSuccess] = React.useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!volunteerForms.every(value => isVolunteerFormDataValid(value))) {
      return;
    }
    const json = await ajax({
      url: 'student/volunteer',
      data: volunteerForms,
      method: 'POST'
    });
    if (json.code !== Code.success) {
      message.error('暂时无法提交志愿');
      return;
    }
    setSuccess(true);
  }
  return [success, handleSubmit];
}

function isVolunteerFormDataValid({ college, professions }: VolunteerFormData) {
  return college && professions.every(value => !!value);
}

function useVolunteerForm(): [VolunteerFormData, React.Dispatch<React.SetStateAction<VolunteerFormData>>] {
  const [volunteerForm, setVolunteerForm] = React.useState<VolunteerFormData>({
    college: '',
    professions: ['', '', '', '', '', ''],
    isObey: false
  });
  return [volunteerForm, setVolunteerForm];
}

function useForbidden() {
  const [forbidden, setForbidden] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const json = await ajax({
        url: 'student/volunteer',
        method: 'GET'
      });
      if (json.code !== Code.success) {
        setForbidden(true);
      }
    })();
  }, []);
  return forbidden;
}