import { Table, message, Button, Radio, Input, Modal } from 'antd';
import * as React from 'react';
import ajax, { Code } from 'src/utility/ajax';
import { ColumnProps } from 'antd/lib/table';
import { RadioChangeEvent } from 'antd/lib/radio';
import * as style from './style.scss';
import { EnrollDataOp } from '..';

const { Group } = Radio;

interface EnrollTableData {
  key: number | string;
  name: string;
  grade: number;
  professions: string[];
}

interface Profession {
  key: string | number;
  profession: string;
}

interface EnrollTableProps {
  setEnroll: (name: string, op: EnrollDataOp) => void;
}

export default function EnrollTable({ setEnroll }: EnrollTableProps) {
  const [enrollTableData, updateEnrollTableData] = useEnrollTableData();
  const [professions, setProfessions] = React.useState<Profession[]>([]);
  if (!(enrollTableData && enrollTableData.length)) {
    return <h1>所有考生已处理完毕</h1>
  }
  const handleRadioOrInputChange = (key: string | number) => (e: RadioChangeEvent | React.ChangeEvent<HTMLInputElement>) => {
    professions[key] && setEnroll(professions[key], EnrollDataOp.increment);
    professions[key] = e.target.value;
    setEnroll(professions[key], EnrollDataOp.decrement);
    setProfessions(professions);
  }
  const columns: Array<ColumnProps<EnrollTableData>> = [
    {
      title: '考号',
      dataIndex: 'key'
    }, {
      title: '姓名',
      dataIndex: 'name'
    }, {
      title: '总分',
      dataIndex: 'grade'
    }, {
      title: '专业',
      dataIndex: 'professions',
      render: (text: string[], { key }) => (
        text && text.length ? (
          <Group value={professions[key] || null} onChange={handleRadioOrInputChange(key)} className={style.radioGroup}>
            {text.map((v, index) => <Radio key={index} value={v}>{v}</Radio>)}
          </Group>
        ) : (
            <Input value={professions[key] || ''} onChange={handleRadioOrInputChange(key)} />
          )
      )
    }
  ];
  function handleNextPageClick() {
    updateEnrollTableData(professions);
  }
  function handleRetreat() {
    Modal.confirm({
      title: "是否要退档?",
      content: "警告,此操作不可撤销",
      okText: "退档",
      cancelText: "取消",
      onOk: async () => {
        const json = await ajax({ url: 'college/retreat', method: 'POST' });
        if (json.code === Code.success) {
          message.success('退档成功');
        } else {
          message.error('退档失败');
        }
      }
    });
  }
  return (
    <>
      <h2>考生信息表</h2>
      <Table columns={columns} dataSource={enrollTableData} pagination={false} />
      <div className={style.buttonContainer}>
        <Button type="primary" onClick={handleNextPageClick} size="large">下一页</Button>
        <Button type="danger" onClick={handleRetreat} size="large">退档</Button>
      </div>
    </>
  )
}

function useEnrollTableData(): [EnrollTableData[], (professions?: Profession[]) => Promise<void>] {
  const [enrollTableData, setEnrollTableData] = React.useState<EnrollTableData[]>([]);
  async function updateEnrollTableData(professions: Profession[] = []) {
    const json = await ajax<EnrollTableData[]>({ url: 'college/table', data: { professions }, method: 'POST' });
    if (json.code !== Code.success) {
      message.error("拉取招生表格数据失败");
      return;
    }
    setEnrollTableData(json.data)
  }
  React.useEffect(() => void updateEnrollTableData(), []);
  return [enrollTableData, updateEnrollTableData];
}
