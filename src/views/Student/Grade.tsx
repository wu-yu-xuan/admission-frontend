import * as React from 'react';
import ajax, { Code } from 'src/utility/ajax';
import { message } from 'antd';
import ContentTitle from 'src/components/ContentTitle';
import { SelectValue } from 'antd/lib/select';
import SearchBar, { useInput } from './SearchBar';

export default function Info() {
  const [value, handleChange] = useInput();
  const [result, handleSelect] = useSearch();

  return (
    <>
      <ContentTitle>录取分数线</ContentTitle>
      <SearchBar value={value} onChange={handleChange} onSelect={handleSelect} />
      {result === null || (
        <h3>{value} 的录取分数线为 {result}</h3>
      )}
    </>
  );
}

function useSearch(): [number, (v: SelectValue) => Promise<void>] {
  const [result, setResult] = React.useState<number>(null);
  const handleSelect = async (v: SelectValue) => {
    const json = await ajax<number>({
      url: 'student/grade',
      data: { college: v.toString() }
    });
    if (json.code !== Code.success) {
      message.error('查无此学校');
      setResult(null);
      return;
    }
    setResult(json.data);
  }
  return [result, handleSelect];
}