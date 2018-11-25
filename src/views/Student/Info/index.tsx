import * as React from 'react';
import ajax, { Code } from 'src/utility/ajax';
import { message, AutoComplete, Table } from 'antd';
import ContentTitle from 'src/components/ContentTitle';
import * as style from './style.scss';
import { SelectValue } from 'antd/lib/select';
import { ColumnProps } from 'antd/lib/table';

interface ProfessionData {
  key: number | string;
  profession: string;
  count: number;
  batch: string;
}

const columns: Array<ColumnProps<ProfessionData>> = [{
  title: '专业',
  dataIndex: 'profession',
  key: 'profession'
}, {
  title: '批次',
  dataIndex: 'batch',
  key: 'key'
}, {
  title: '招生人数',
  dataIndex: 'count',
  key: 'key'
}];

export default function Info() {
  const colleges = useColleges();
  const [value, handleChange] = useInput();
  const [result, handleSelect] = useSearch();

  return (
    <>
      <ContentTitle>招生信息</ContentTitle>
      <AutoComplete
        dataSource={colleges}
        placeholder="请输入想要查询的学校"
        size="large"
        className={style.search}
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
      />
      {!!result.length && (
        <Table
          dataSource={result}
          columns={columns}
          pagination={false}
        />)
      }
    </>
  );
}

function useSearch(): [ProfessionData[], (v: SelectValue) => Promise<void>] {
  const [result, setResult] = React.useState<ProfessionData[]>([]);
  const handleSelect = async (v: SelectValue) => {
    const json = await ajax<ProfessionData[]>({
      url: 'student/info',
      data: { college: v.toString() }
    });
    if (json.code !== Code.success) {
      message.error('查无此学校');
      setResult([]);
      return;
    }
    setResult(json.data);
  }
  return [result, handleSelect];
}

function useInput(): [string, (v: SelectValue) => void] {
  const [value, setValue] = React.useState('');
  const handleChange = (v: SelectValue) => setValue(v.toString());
  return [value, handleChange];
}

function useColleges() {
  const [colleges, setColleges] = React.useState<string[]>([]);

  React.useEffect(() => {
    (async () => {
      const json = await ajax<string[]>({ url: 'student/colleges' });
      if (json.code !== Code.success) {
        message.error('获取学校列表失败');
        return;
      }
      setColleges(json.data);
    })();
  }, []);

  return colleges;
}