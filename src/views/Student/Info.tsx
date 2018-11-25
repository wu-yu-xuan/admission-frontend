import * as React from 'react';
import ajax, { Code } from 'src/utility/ajax';
import { message, Table } from 'antd';
import ContentTitle from 'src/components/ContentTitle';
import { SelectValue } from 'antd/lib/select';
import { ColumnProps } from 'antd/lib/table';
import SearchBar, { useInput } from './SearchBar';

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
  const [value, handleChange] = useInput();
  const [result, handleSelect] = useSearch();

  return (
    <>
      <ContentTitle>招生信息</ContentTitle>
      <SearchBar value={value} onChange={handleChange} onSelect={handleSelect} />
      {!!result.length && (
        <Table
          dataSource={result}
          columns={columns}
          pagination={false}
        />
      )}
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