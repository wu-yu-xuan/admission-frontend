import * as React from 'react';
import ajax, { Code } from 'src/utility/ajax';
import { Icon } from 'antd';
import ContentTitle from 'src/components/ContentTitle';
import * as style from './style.scss';
import * as classNames from 'classnames';

export default function Situation() {
  const [loading, success, college, profession] = useSituation();

  if (loading) {
    return (
      <>
        <ContentTitle>录取情况</ContentTitle>
        <p className={style.loading}>
          <Icon type="loading" className={style.icon} />
          正在获取录取情况
        </p>
      </>
    );
  }

  if (!success) {
    return (
      <>
        <ContentTitle>录取情况</ContentTitle>
        <p className={style.forbidden}>
          <Icon type="warning" className={style.icon} />
          未查询到任何录取信息
        </p>
      </>
    );
  }

  return (
    <>
      <ContentTitle>录取情况</ContentTitle>
      <p className={style.success}>恭喜你被以下学校专业录取</p>
      <p className={classNames(style.success, style.college)}>{college}</p>
      <p className={classNames(style.success, style.profession)}>{profession}</p>
    </>
  );
}

function useSituation(): [boolean, boolean, string, string] {
  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [college, setCollege] = React.useState('');
  const [profession, setProfession] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const json = await ajax<{ college: string, profession: string }>({
        url: 'student/situation'
      });
      setLoading(false);
      if (json.code !== Code.success) {
        return;
      }
      setSuccess(true);
      setCollege(json.data.college);
      setProfession(json.data.profession);
    })();
  }, []);

  return [loading, success, college, profession];
}