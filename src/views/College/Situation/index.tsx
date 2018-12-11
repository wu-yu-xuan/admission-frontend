import { Table, message } from 'antd';
import * as React from 'react';
import ajax, { Code } from 'src/utility/ajax';
import { ColumnProps } from 'antd/lib/table';
import DownloadButton from './DownloadButton';

interface SituationData {
  key: number | string;
  name: string;
  grade: number;
  school: string;
  type: '调招' | '统招' | '特招';
}

const columns: Array<ColumnProps<SituationData>> = [{
  title: '考号',
  dataIndex: 'key',
  sorter: (a, b) => parseInt(a.key.toString(), 10) - parseInt(b.key.toString(), 10)
}, {
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '总分',
  dataIndex: 'grade',
  sorter: (a, b) => a.grade - b.grade
}, {
  title: '毕业学校',
  dataIndex: 'school'
}, {
  title: '录取类型',
  dataIndex: 'type',
  filters: [
    {
      text: '统招',
      value: '统招'
    }, {
      text: '调招',
      value: '调招'
    }, {
      text: '特招',
      value: '特招'
    }
  ],
  filterMultiple: false,
  onFilter: (v, r) => r.type === v
}]

export default function Situation() {
  const situation = useSituation();
  return (
    <>
      <Table dataSource={situation} columns={columns} />
      <DownloadButton />
    </>
  )
}

function useSituation() {
  const [situation, setSituation] = React.useState<SituationData[]>([]);
  React.useEffect(() => {
    (async () => {
      const json = await ajax<SituationData[]>({ url: 'college/situation' });
      if (json.code !== Code.success) {
        message.error('获取录取情况失败');
        return;
      }
      setSituation(json.data);
    })();
  }, []);
  return situation;
}