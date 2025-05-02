import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Dropdown, Option, ToggleButton } from '@fluentui/react-components';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Label, Brush } from 'recharts';

const MONTHS = [
  '', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

const stages = ['All', 'Prospecting', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

// Sample data with isNew property
const deals = [
  // March
  { id: 1, name: 'Acme Pvt Ltd', size: 120000, stage: 'Prospecting', nextActivityDate: '03/05' },
  { id: 2, name: 'Beta Inc', size: 80000, stage: 'Qualified', nextActivityDate: '03/12' },
  { id: 3, name: 'Gamma LLC', size: 50000, stage: 'Proposal', nextActivityDate: '03/20' },
  { id: 4, name: 'Delta Ltd', size: 200000, stage: 'Negotiation', nextActivityDate: '03/25' },
  { id: 5, name: 'Epsilon AG', size: 95000, stage: 'Qualified', nextActivityDate: '03/28' },
  { id: 6, name: 'Zeta Group', size: 30000, stage: 'Prospecting', nextActivityDate: '03/30' },
  { id: 7, name: 'Eta Corp', size: 150000, stage: 'Proposal', nextActivityDate: '03/31' },
  // April
  { id: 8, name: 'Theta LLC', size: 60000, stage: 'Negotiation', nextActivityDate: '04/01' },
  { id: 9, name: 'Iota Ltd', size: 110000, stage: 'Closed Won', nextActivityDate: '04/05' },
  { id: 10, name: 'Kappa Inc', size: 40000, stage: 'Closed Lost', nextActivityDate: '04/10' },
  { id: 11, name: 'Lambda GmbH', size: 175000, stage: 'Prospecting', nextActivityDate: '04/15' },
  { id: 12, name: 'Mu SA', size: 105000, stage: 'Qualified', nextActivityDate: '04/18' },
  { id: 13, name: 'Nu BV', size: 90000, stage: 'Proposal', nextActivityDate: '04/20' },
  { id: 14, name: 'Xi PLC', size: 130000, stage: 'Negotiation', nextActivityDate: '04/22' },
  { id: 15, name: 'Omicron Ltd', size: 70000, stage: 'Qualified', nextActivityDate: '04/25' },
  { id: 16, name: 'Pi Group', size: 60000, stage: 'Prospecting', nextActivityDate: '04/28' },
  // May
  { id: 17, name: 'Rho Inc', size: 155000, stage: 'Proposal', nextActivityDate: '05/02' },
  { id: 18, name: 'Sigma LLC', size: 85000, stage: 'Negotiation', nextActivityDate: '05/08' },
  { id: 19, name: 'Tau Ltd', size: 125000, stage: 'Closed Won', nextActivityDate: '05/12' },
  { id: 20, name: 'Upsilon AG', size: 50000, stage: 'Closed Lost', nextActivityDate: '05/15' },
  { id: 21, name: 'Phi Corp', size: 140000, stage: 'Prospecting', nextActivityDate: '05/18' },
  { id: 22, name: 'Chi LLC', size: 95000, stage: 'Qualified', nextActivityDate: '05/22' },
  { id: 23, name: 'Psi Ltd', size: 60000, stage: 'Proposal', nextActivityDate: '05/25' },
  { id: 24, name: 'Omega Inc', size: 170000, stage: 'Negotiation', nextActivityDate: '05/28' },
  { id: 25, name: 'Alpha AG', size: 120000, stage: 'Closed Won', nextActivityDate: '05/31' },
];

const minDate = 400, maxDate = 518; // 04/00 to 05/18 (for sample)
const yDomain = [minDate, maxDate];
const xDomainDefault = [0, 220000];
const xDomainZoom = [0, 100000];

function isValidDateString(date: string | null) {
  if (!date) return false;
  const [mm, dd] = date.split('/').map(Number);
  return (
    !isNaN(mm) && !isNaN(dd) &&
    mm >= 1 && mm <= 12 &&
    dd >= 1 && dd <= 31
  );
}

function getYValue(date: string | null) {
  if (!date) return null;
  const [mm, dd] = date.split('/').map(Number);
  if (
    isNaN(mm) || isNaN(dd) ||
    mm < 1 || mm > 12 ||
    dd < 1 || dd > 31
  ) {
    console.warn('Invalid date format:', date);
    return null;
  }
  return mm * 100 + dd;
}

function formatYAxisTick(v: number) {
  if (v === 999) return 'No Date';
  const mm = Math.floor(v / 100);
  const dd = v % 100;
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return '';
  return `${dd.toString().padStart(2, '0')} ${MONTHS[mm]}`;
}

interface DealBadgeProps {
  cx?: number;
  cy?: number;
  payload: { name: string };
}

const DealBadge = (props: DealBadgeProps) => {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null) return <g />;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <g transform="translate(16,0)">
        <circle cx={0} cy={0} r={10} fill="#b6d3fa" />
        <rect x={10} y={-13} rx={10} ry={10} width={110} height={26} fill="#e0e7ff" />
        <text x={20} y={5} fontSize={15} fill="#5a6473" fontWeight={500}>{payload.name}</text>
      </g>
    </g>
  );
};

export default function DealPipelineView() {
  const [stage, setStage] = useState('All');
  const [zoomed, setZoomed] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (chartRef.current) {
      // chartHeight is no longer used
    }
  }, []);

  const filteredDeals = stage === 'All' ? deals : deals.filter(d => d.stage === stage);
  const withDate = filteredDeals.filter(d => d.nextActivityDate).map(d => ({ ...d, y: getYValue(d.nextActivityDate) }));
  const xDomain = zoomed ? xDomainZoom : xDomainDefault;

  useEffect(() => {
    const invalidDeals = deals.filter(d => d.nextActivityDate && !isValidDateString(d.nextActivityDate));
    if (invalidDeals.length > 0) {
      console.warn('Deals with invalid nextActivityDate:', invalidDeals);
    } else {
      console.log('All deals have valid nextActivityDate values.');
    }
    // Log all y values being passed to the chart
    console.log('Chart data (withDate):', withDate.map(d => ({ name: d.name, nextActivityDate: d.nextActivityDate, y: d.y })));
  }, [withDate]);

  return (
    <div className="flex flex-col gap-6 w-full h-full p-8">
      <div className="flex items-center gap-4 mb-2">
        <ToggleButton checked={zoomed} onClick={() => setZoomed(z => !z)}>
          {zoomed ? 'Zoomed View' : 'Default View'}
        </ToggleButton>
        <Dropdown value={stage} onChange={((_event, data) => setStage(data.optionValue as string)) as any}>
          {stages.map(s => (
            <Option key={s} value={s}>{s}</Option>
          ))}
        </Dropdown>
      </div>
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <div ref={chartRef} style={{ minWidth: 1400, width: '100%' }}>
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart margin={{ left: 40, right: 180, top: 20, bottom: 40 }}>
              <XAxis
                type="number"
                dataKey="y"
                name="Activity Date"
                domain={yDomain}
                tickFormatter={formatYAxisTick}
              >
                <Label value="Upcoming Activity Date" offset={-10} position="insideBottom" />
              </XAxis>
              <YAxis
                type="number"
                dataKey="size"
                name="Deal Size"
                domain={xDomain}
                tickFormatter={v => `$${v / 1000}k`}
              >
                <Label value="Deal Size ($)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
              </YAxis>
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(_v: number, _n: string, props: { payload: { name: string; size: number; stage: string; nextActivityDate?: string } }) => {
                  const d = props.payload;
                  return [
                    `Name: ${d.name}`,
                    `Size: $${d.size}`,
                    `Stage: ${d.stage}`,
                    `Activity Date: ${d.nextActivityDate || 'No Date'}`
                  ];
                }}
              />
              <Scatter data={withDate} shape={DealBadge} />
              <Brush dataKey="y" height={30} stroke="#2563eb" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
 