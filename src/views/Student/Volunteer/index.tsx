import * as React from 'react';
import ContentTitle from 'src/components/ContentTitle';
import ajax, { Code } from 'src/utility/ajax';
import { Icon, Button } from 'antd';
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

  if (forbidden) {
    return (
      <>
        <ContentTitle>填报志愿</ContentTitle>
        <p className={style.forbidden}>
          <Icon type="frown" className={style.icon} />
          尚未到填报志愿的时间或已经截止
        </p>
      </>
    )
  }
  const buttonDisabled = !volunteerForms.every(value => isVolunteerFormDataValid(value[0]));
  return (
    <>
      <ContentTitle>填报志愿</ContentTitle>
      <form>
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