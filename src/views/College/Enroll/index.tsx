import * as React from 'react';
import ContentTitle from 'src/components/ContentTitle';
import ajax from 'src/utility/ajax';
import { message } from 'antd';
import Profession from './Profession';
import EnrollTable from './EnrollTable';

type titles = '统招' | '特招' | '调招';

interface EnrollProps {
  title: titles
}

export interface EnrollData {
  name: string;
  population: number
}

export enum EnrollDataOp {
  increment,
  decrement
}

function Enroll({ title }: EnrollProps) {
  const [enroll, setEnroll] = useEnroll(title);
  return (
    <>
      <ContentTitle>{title}</ContentTitle>
      {
        (enroll && enroll.length) ? (
          <>
            <Profession data={enroll} />
            <EnrollTable setEnroll={setEnroll} />
          </>
        ) :
          <h1>招生工作已经结束</h1>
      }
    </>
  )
}

function useEnroll(type: titles): [EnrollData[], (name: string, op: EnrollDataOp) => void] {
  const [enroll, setEnroll] = React.useState<EnrollData[]>([]);
  React.useEffect(() => {
    (async () => {
      const json = await ajax<EnrollData[]>({ url: 'college/enroll', data: { type } });
      setEnroll(json.data);
    })();
  }, []);
  function setEnrollData(name: string, op: EnrollDataOp) {
    const index = enroll.findIndex(v => v.name === name);
    if (index < 0) {
      return;
    }
    switch (op) {
      case EnrollDataOp.decrement:
        enroll[index].population = enroll[index].population - 1;
        if (enroll[index].population <= 0) {
          message.warning(`${enroll[index].name}剩余人数不足!`);
        }
        break;
      case EnrollDataOp.increment:
        enroll[index].population = enroll[index].population + 1;
        break;
      default:
        break;
    }
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