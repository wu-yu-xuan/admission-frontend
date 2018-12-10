import * as React from 'react';
import ContentTitle from 'src/components/ContentTitle';
import ajax from 'src/utility/ajax';
import { message } from 'antd';
import Profession from './Profession';

type titles = '统招' | '特招' | '调招';

interface EnrollProps {
  title: titles
}

export interface EnrollData {
  name: string;
  population: number
}

function Enroll({ title }: EnrollProps) {
  const [enroll] = useEnroll(title);
  return (
    <>
      <ContentTitle>{title}</ContentTitle>
      <Profession data={enroll} />
    </>
  )
}

function useEnroll(type: titles): [EnrollData[], (data: EnrollData) => void] {
  const [enroll, setEnroll] = React.useState<EnrollData[]>([]);
  React.useEffect(() => {
    (async () => {
      const json = await ajax<EnrollData[]>({ url: 'college/enroll', data: { type } });
      setEnroll(json.data);
    })();
  }, []);
  function setEnrollData(data: EnrollData) {
    const index = enroll.findIndex(v => v.name === data.name);
    if (index < 0) {
      message.error("查找目标专业失败");
      return;
    }
    enroll[index] = data;
    setEnroll(enroll);
  }
  return [enroll, setEnrollData];
}

export function Special() {
  return <Enroll title="特招" />
}

export function Unity() {
  return <Enroll title="统招" />
}

export function Adjust() {
  return <Enroll title="调招" />
}