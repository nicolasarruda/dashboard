import './styles.css';
import SalesSummaryCard from './sales-summary-card';
import { ReactComponent as AvatarIcon } from './../../assets/images/avatar-icon.svg';
import { ReactComponent as BarChartIcon } from './../../assets/images/bar-chart-icon.svg';
import { ReactComponent as DoneIcon } from './../../assets/images/done-icon.svg';
import { ReactComponent as SyncIcon } from './../../assets/images/sync-icon.svg';
import { FilterData, SalesSummaryData } from '../../types';
import { buildFilterParams, makeRequest } from '../../utils/request';
import { useEffect, useMemo, useState } from 'react';
import { formatAvg } from '../../utils/formatters';

type Props = {
  filterData?: FilterData;
};

const initialSummary = {
  avg: 0,
  count: 0,
  max: 0,
  min: 0
};

function SalesSummaryComponent({ filterData }: Props) {
  const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);
  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesSummaryData>('/sales/summary', { params })
      .then((response) => {
        setSummary(response.data);
      })
      .catch(() => {
        console.error('Error to fetch sales summary');
      });
  }, [params]);

  return (
    <div className="sales-summary-container">
      <SalesSummaryCard value={formatAvg(summary?.avg)} label="Média" icon={<DoneIcon />} />
      <SalesSummaryCard value={summary?.count} label="Quantidade" icon={<SyncIcon />} />
      <SalesSummaryCard value={summary?.min} label="Mínima" icon={<BarChartIcon />} />
      <SalesSummaryCard value={summary?.max} label="Máxima" icon={<AvatarIcon />} />
    </div>
  );
}

export default SalesSummaryComponent;
