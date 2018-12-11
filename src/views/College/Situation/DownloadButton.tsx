import * as React from 'react';
import { Button, message } from 'antd';
import ajax, { Code } from 'src/utility/ajax';
import ContentTitle from 'src/components/ContentTitle';

const handleButtonClick = (ref: React.MutableRefObject<HTMLAnchorElement>) => async () => {
  const json = await ajax<string>({ url: 'college/excel' });
  if (json.code !== Code.success) {
    message.error("获取Excel数据失败");
    return;
  }
  const blob = base64ToBlob(json.data);
  const { current } = ref;
  current.download = "录取情况.xlsx";
  current.href = URL.createObjectURL(blob);
  current.click();
}

export default React.memo(function DownloadButton() {
  const ref = React.useRef<HTMLAnchorElement>(null);
  return (
    <>
      <ContentTitle>录取情况</ContentTitle>
      <Button size="large" type="primary" onClick={handleButtonClick(ref)}>下载数据</Button>
      <a hidden={true} ref={ref} />
    </>
  )
});

function base64ToBlob(dataurl: string) {
  const arr = dataurl.split(',');
  const type = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type });
}