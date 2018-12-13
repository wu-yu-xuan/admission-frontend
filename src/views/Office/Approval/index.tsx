import * as React from 'react';
import ContentTitle from 'src/components/ContentTitle';
import { Collapse, message, Button } from 'antd';
import ajax, { Code } from 'src/utility/ajax';
import * as style from './style.scss';
import PanelHeader from './PanelHeader';
import { RadioChangeEvent } from 'antd/lib/radio';

const { Panel } = Collapse;

interface ApprovalData {
  school: string;
  population: number;
  professions: Array<{
    profession: string;
    population: number;
  }>;
}

export default function Approval() {
  const approvalData = useApprovalData();
  const [approvalChecks, updateApprovalChecks] = useApprovalChecks();
  async function handleButtonClick() {
    const data = approvalChecks.reduce<string[]>((arr: string[], v, i) => {
      if (v) {
        arr.push(approvalData[i].school);
      }
      return arr;
    }, []);
    const json = await ajax({
      url: 'office/approval',
      data
    });
    if (json.code === Code.success) {
      message.success('审批提交成功');
    } else {
      message.error('审批提交失败');
    }
  }
  return (
    <>
      <ContentTitle>审批</ContentTitle>
      <Collapse accordion={true}>
        {approvalData.map(({ school, population, professions }, i) => (
          <Panel
            key={i.toString()}
            header={<PanelHeader
              title={`${school}: ${population}人`}
              checked={approvalChecks[i] || false}
              onChange={updateApprovalChecks(i)}
            />}
          >
            <div className={style.professionContainer}>
              {professions.map((v, k) => (
                <div key={k} className={style.profession}>
                  <span className={style.name}>{v.profession}:</span>
                  <span className={style.population}>{v.population}人</span>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </Collapse>
      <Button className={style.btn} type="primary" size="large" onClick={handleButtonClick}>提交</Button>
    </>
  )
}

function useApprovalChecks(): [boolean[], (index: number) => (e: RadioChangeEvent) => void] {
  const [approvalChecks, setApprovalChecks] = React.useState<boolean[]>([]);
  const updateApprovalChecks = (index: number) => (e: RadioChangeEvent) => {
    e.stopPropagation();
    approvalChecks[index] = e.target.checked;
    setApprovalChecks(approvalChecks);
  }
  return [approvalChecks, updateApprovalChecks];
}

function useApprovalData() {
  const [approvalData, setApprovalData] = React.useState<ApprovalData[]>([]);
  React.useEffect(() => {
    (async () => {
      const json = await ajax<ApprovalData[]>({ url: 'office/approval' });
      if (json.code !== Code.success) {
        message.error('审批数据获取失败');
        return;
      }
      setApprovalData(json.data);
    })()
  }, []);
  return approvalData;
}
