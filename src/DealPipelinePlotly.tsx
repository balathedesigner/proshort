import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-dist-min';
import * as React from 'react';
import { Input, Button, TabList, Tab, Dropdown, Option, Combobox } from '@fluentui/react-components';
import DealTooltipCard from './DealTooltipCard';

interface Deal {
  id: number;
  name: string;
  size: number;
  stage: string;
  nextActivityDate: string;
  probability: string;
  isNew?: boolean;
  stageDuration?: string;
  dealOwner?: string;
  negativeReason?: string;
  positiveReason?: string;
  nextCall?: string;
  nextCallLink?: string;
  meddicc?: { label: string; color: string; textColor?: string }[];
  lastActivity?: string;
  lastActivityType?: string;
  lastActivityStatus?: string;
}

const sampleOwners = [
  'Sarah Kim', 'John Doe', 'Priya Singh', 'Alex Lee', 'Maria Garcia',
  'Emily Chen', 'David Park', 'Olivia Brown', 'James Smith', 'Sophia Patel'
];

const deals: (Deal & { isNew?: boolean })[] = [
  // March
  { id: 1, name: 'Acme Pvt Ltd', size: 120000, stage: 'Discovery', nextActivityDate: '03/05', probability: 'Medium', isNew: true, dealOwner: 'Sarah Kim' },
  { id: 2, name: 'Beta Inc', size: 80000, stage: 'Prospect', nextActivityDate: '03/12', probability: 'High', dealOwner: 'John Doe' },
  { id: 3, name: 'Gamma LLC', size: 50000, stage: 'Discovery', nextActivityDate: '03/20', probability: 'Low', isNew: true, dealOwner: 'Priya Singh' },
  { id: 4, name: 'Delta Ltd', size: 200000, stage: 'Prospect', nextActivityDate: '03/25', probability: 'Very High', dealOwner: 'Alex Lee' },
  { id: 5, name: 'Epsilon AG', size: 95000, stage: 'Qualified', nextActivityDate: '03/28', probability: 'Medium', dealOwner: 'Maria Garcia' },
  { id: 6, name: 'Zeta Group', size: 30000, stage: 'Prospecting', nextActivityDate: '03/30', probability: 'Very Low', dealOwner: 'Emily Chen' },
  { id: 7, name: 'Eta Corp', size: 150000, stage: 'Proposal', nextActivityDate: '03/31', probability: 'Medium', isNew: true, dealOwner: 'David Park' },
  // April
  { id: 8, name: 'Theta LLC', size: 60000, stage: 'Negotiation', nextActivityDate: '04/01', probability: 'High' },
  { id: 9, name: 'Iota Ltd', size: 110000, stage: 'Closed Won', nextActivityDate: '04/05', probability: 'Very High' },
  { id: 10, name: 'Kappa Inc', size: 40000, stage: 'Closed Lost', nextActivityDate: '04/10', probability: 'Low' },
  { id: 11, name: 'Lambda GmbH', size: 175000, stage: 'Prospecting', nextActivityDate: '04/15', probability: 'Medium' },
  { id: 12, name: 'Mu SA', size: 105000, stage: 'Qualified', nextActivityDate: '04/18', probability: 'High' },
  { id: 13, name: 'Nu BV', size: 90000, stage: 'Proposal', nextActivityDate: '04/20', probability: 'Low' },
  { id: 14, name: 'Xi PLC', size: 130000, stage: 'Negotiation', nextActivityDate: '04/22', probability: 'Medium' },
  { id: 15, name: 'Omicron Ltd', size: 70000, stage: 'Qualified', nextActivityDate: '04/25', probability: 'Very Low' },
  { id: 16, name: 'Pi Group', size: 60000, stage: 'Prospecting', nextActivityDate: '04/28', probability: 'Low' },
  // May
  { id: 17, name: 'Rho Inc', size: 155000, stage: 'Proposal', nextActivityDate: '05/02', probability: 'High' },
  { id: 18, name: 'Sigma LLC', size: 85000, stage: 'Negotiation', nextActivityDate: '05/08', probability: 'Medium' },
  { id: 19, name: 'Tau Ltd', size: 125000, stage: 'Closed Won', nextActivityDate: '05/12', probability: 'Very High' },
  { id: 20, name: 'Upsilon AG', size: 50000, stage: 'Closed Lost', nextActivityDate: '05/15', probability: 'Very Low' },
  { id: 21, name: 'Phi Corp', size: 140000, stage: 'Prospecting', nextActivityDate: '05/18', probability: 'Medium' },
  { id: 22, name: 'Chi LLC', size: 95000, stage: 'Qualified', nextActivityDate: '05/22', probability: 'High' },
  { id: 23, name: 'Psi Ltd', size: 60000, stage: 'Proposal', nextActivityDate: '05/25', probability: 'Low' },
  { id: 24, name: 'Omega Inc', size: 170000, stage: 'Negotiation', nextActivityDate: '05/28', probability: 'Very High' },
  { id: 25, name: 'Alpha AG', size: 120000, stage: 'Closed Won', nextActivityDate: '05/31', probability: 'High' },
  // No Active Deals (no nextActivityDate)
  { id: 26, name: 'Orion Holdings', size: 135000, stage: 'Proposal', nextActivityDate: '', probability: 'Low', lastActivity: '2023-05-10', lastActivityType: 'Call', lastActivityStatus: 'Success', dealOwner: 'Sarah Kim' },
  { id: 27, name: 'Nova Ventures', size: 95000, stage: 'Negotiation', nextActivityDate: '', probability: 'Medium', lastActivity: '2023-05-08', lastActivityType: 'Email', lastActivityStatus: 'Failed', dealOwner: 'John Doe' },
  { id: 28, name: 'Pioneer Ltd', size: 70000, stage: 'Qualified', nextActivityDate: '', probability: 'High', lastActivity: '2023-05-05', lastActivityType: 'Meeting', lastActivityStatus: 'Success', dealOwner: 'Priya Singh' },
  { id: 29, name: 'Zenith Corp', size: 160000, stage: 'Prospecting', nextActivityDate: '', probability: 'Very Low', lastActivity: '2023-05-01', lastActivityType: 'Call', lastActivityStatus: 'Failed', dealOwner: 'Alex Lee' },
  { id: 30, name: 'Atlas Group', size: 105000, stage: 'Proposal', nextActivityDate: '', probability: 'Medium', lastActivity: '2023-04-28', lastActivityType: 'Meeting', lastActivityStatus: 'Success', dealOwner: 'Maria Garcia' },
];

// Ensure each stage/probability group has at least 15 deals
(function ensureMinDealsPerCell() {
  let maxId = deals.reduce((max, d) => Math.max(max, d.id), 0);
  const stages = Array.from(new Set(deals.map(d => d.stage)));
  const probabilities = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
  const names = [
    'Acme', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
    'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon',
    'Phi', 'Chi', 'Psi', 'Omega', 'Alpha', 'Orion', 'Nova', 'Pioneer', 'Zenith', 'Atlas',
    'Vega', 'Lyra', 'Cygnus', 'Draco', 'Phoenix', 'Hydra', 'Pegasus', 'Aurora', 'Lynx', 'Leo'
  ];
  let nameIdx = 0;
  let ownerIdx = 0;
  for (const stage of stages) {
    for (const prob of probabilities) {
      const group = deals.filter(d => d.stage === stage && d.probability === prob);
      const toAdd = 15 - group.length;
      for (let i = 0; i < toAdd; ++i) {
        maxId++;
        deals.push({
          id: maxId,
          name: `${names[nameIdx % names.length]} AutoGen ${maxId}`,
          size: 20000 + Math.floor(Math.random() * 180000),
          stage,
          nextActivityDate: `06/${String(1 + (maxId % 28)).padStart(2, '0')}`,
          probability: prob,
          isNew: false,
          dealOwner: sampleOwners[ownerIdx % sampleOwners.length],
        });
        nameIdx++;
        ownerIdx++;
      }
    }
  }
  // Assign owners to any deals missing dealOwner
  let assignIdx = 0;
  for (const d of deals) {
    if (!d.dealOwner) {
      d.dealOwner = sampleOwners[assignIdx % sampleOwners.length];
      assignIdx++;
    }
  }
})();

const allStages = Array.from(new Set(deals.map(d => d.stage)));
const allProbabilities = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];

const probabilityColors: Record<string, string> = {
  'Very Low': '#fdecea', // red-tint
  'Low': '#fff4e5',      // orange-tint
  'Medium': '#fffbe6',   // yellow-tint
  'High': '#e6f4ff',     // blue-tint
  'Very High': '#e6f9ed' // green-tint
};
const probabilityTextColors: Record<string, string> = {
  'Very Low': '#d93025',
  'Low': '#ea8600',
  'Medium': '#b38600',
  'High': '#2563eb',
  'Very High': '#137333'
};

// Define the new stages for the summary view
const summaryStages = ['Discovery', 'Prospect', 'Qualify', 'Proposal', 'Negotiation', 'Closed Won'];
const summaryProbabilities = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];

export default function DealPipelinePlotly() {
  const [selectedDeal, setSelectedDeal] = React.useState<Deal | null>(null);
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [chartView, setChartView] = React.useState<'summary' | 'deals'>('summary');
  const [selectedStages, setSelectedStages] = React.useState<string[]>(allStages);
  const [selectedProbs, setSelectedProbs] = React.useState<string[]>(allProbabilities);
  const [search, setSearch] = React.useState('');
  const [tab, setTab] = React.useState('active');

  // Add state to lock selected stage/probability group
  const [lockedStage, setLockedStage] = React.useState<string | null>(null);
  const [lockedProb, setLockedProb] = React.useState<string | null>(null);

  // Add selectedOwner state
  const [selectedOwner, setSelectedOwner] = React.useState<string>('');

  // Add owner filter state
  const allOwners = Array.from(new Set(deals.map(d => d.dealOwner).filter((o): o is string => Boolean(o))));
  const [selectedOwners, setSelectedOwners] = React.useState<string[]>(allOwners);

  // Filter deals
  const noActiveDeals = deals.filter(d => !d.nextActivityDate);

  // Filter deals based on all filters (for deals view)
  const filteredDeals = deals.filter(d => {
    const stageOk = (lockedStage ? d.stage === lockedStage : selectedStages.includes(d.stage));
    const probOk = (lockedProb ? d.probability === lockedProb : selectedProbs.includes(d.probability));
    const searchOk = d.name.toLowerCase().includes(search.toLowerCase());
    return stageOk && probOk && searchOk;
  });

  // Aggregate deals by stage and probability
  const aggregatedDealData = React.useMemo(() => {
    const stageData = allStages.map(stage => {
      const dealsInStage = filteredDeals.filter(d => d.stage === stage);
      const probabilityGroups = allProbabilities.map(prob => {
        const dealsInProb = dealsInStage.filter(d => d.probability === prob);
        return {
          probability: prob,
          totalAmount: dealsInProb.reduce((sum, deal) => sum + deal.size, 0),
          dealCount: dealsInProb.length
        };
      });

      return {
        stage,
        probabilityGroups,
        totalAmount: dealsInStage.reduce((sum, deal) => sum + deal.size, 0),
        dealCount: dealsInStage.length
      };
    });
    return stageData;
  }, [filteredDeals, allStages, allProbabilities]);

  // Split filteredDeals into new and regular
  const newDeals = filteredDeals.filter(d => d.isNew);
  const regularDeals = filteredDeals.filter(d => !d.isNew);

  // Chart configurations
  const dealScatterData: Array<Partial<Plotly.ScatterData>> = [
    // Regular deals
    {
      x: regularDeals.map(d => `2023-${d.nextActivityDate?.replace('/', '-')}`),
      y: regularDeals.map(d => d.size),
      text: regularDeals.map(d => d.name),
      customdata: regularDeals.map(d => d.id),
      mode: 'text+markers' as const,
      type: 'scatter',
      textposition: 'top right' as const,
      marker: {
        size: 20,
        color: '#b6d3fa',
        line: { width: 3, color: '#2563eb' },
        symbol: 'circle',
      },
      name: 'All Deals',
      visible: chartView === 'deals' ? true : 'legendonly'
    },
    // New deals: name text
    {
      x: newDeals.map(d => `2023-${d.nextActivityDate?.replace('/', '-')}`),
      y: newDeals.map(d => d.size),
      text: newDeals.map(d => d.name),
      customdata: newDeals.map(d => d.id),
      mode: 'text' as const,
      type: 'scatter',
      textposition: 'top right' as const,
      showlegend: false,
      visible: chartView === 'deals' ? true : 'legendonly'
    },
    // New deals: star marker
    {
      x: newDeals.map(d => `2023-${d.nextActivityDate?.replace('/', '-')}`),
      y: newDeals.map(d => d.size),
      text: newDeals.map(() => '★'),
      customdata: newDeals.map(d => d.id),
      mode: 'text+markers' as const,
      type: 'scatter',
      textposition: 'middle center' as const,
      marker: {
        size: 24,
        color: '#f8bbd0',
        line: { width: 4, color: '#a61b46' },
        symbol: 'circle',
      },
      textfont: { color: '#a61b46', size: 16, family: 'inherit' },
      showlegend: true,
      name: 'New Deals',
      visible: chartView === 'deals' ? true : 'legendonly'
    }
  ];

  // Separate summary chart data
  const summaryChartData: Array<Partial<Plotly.ScatterData>> = [
    {
      x: allStages.flatMap(stage => Array(allProbabilities.length).fill(stage)),
      y: allStages.flatMap(() => allProbabilities),
      mode: 'markers' as const,
      type: 'scatter',
      marker: {
        size: aggregatedDealData.flatMap(d => 
          allProbabilities.map(prob => {
            const group = d.probabilityGroups.find(g => g.probability === prob);
            // Size based on total amount, min 20px max 60px
            return group?.totalAmount ? Math.max(20, Math.min(60, Math.sqrt(group.totalAmount) / 50)) : 20;
          })
        ),
        color: allStages.flatMap(() => 
          allProbabilities.map(prob => probabilityColors[prob])
        ),
        line: {
          width: 2,
          color: allStages.flatMap(() => 
            allProbabilities.map(prob => probabilityTextColors[prob])
          )
        }
      },
      text: aggregatedDealData.flatMap(d => 
        allProbabilities.map(prob => {
          const group = d.probabilityGroups.find(g => g.probability === prob);
          return group?.dealCount ? 
            `$${group.totalAmount.toLocaleString()}<br>${group.dealCount} deals` : 
            'No deals';
        })
      ),
      hovertemplate: 
        '<b>%{x}</b><br>' +
        'Probability: %{y}<br>' +
        '%{text}<extra></extra>',
      showlegend: false
    }
  ];

  const dealChartLayout: Partial<Plotly.Layout> = {
    title: '',
    xaxis: {
      title: 'Upcoming Activity Date',
      type: 'date' as const,
      tickformat: '%d %b',
      showgrid: true,
      zeroline: false,
      showline: true,
      linecolor: '#888',
      linewidth: 2,
    },
    yaxis: {
      title: 'Deal Size ($)',
      tickprefix: '$',
      showgrid: true,
      zeroline: false,
      showline: true,
      linecolor: '#888',
      linewidth: 2,
    },
    dragmode: 'zoom',
    autosize: true,
    height: 600,
    margin: { t: 40, l: 80, r: 40, b: 80 },
    showlegend: false,
    legend: {
      orientation: 'h',
      x: 0.5,
      y: -0.12,
      xanchor: 'center',
      yanchor: 'top',
      font: { size: 15 },
      itemclick: 'toggleothers',
      itemdoubleclick: false,
    },
  };

  const summaryChartLayout: Partial<Plotly.Layout> = {
    title: '',
    xaxis: {
      title: 'Deal Stage',
      type: 'category' as const,
      showgrid: false,
      zeroline: false,
      showline: true,
      linecolor: '#888',
      linewidth: 2,
    },
    yaxis: {
      title: 'Probability',
      type: 'category' as const,
      categoryorder: 'array' as const,
      categoryarray: ['Very Low', 'Low', 'Medium', 'High', 'Very High'],
      showgrid: true,
      gridcolor: '#f0f0f0',
      zeroline: false,
      showline: true,
      linecolor: '#888',
      linewidth: 2,
    },
    dragmode: false,
    autosize: true,
    height: 600,
    margin: { t: 40, l: 100, r: 40, b: 60 },
    showlegend: false,
    plot_bgcolor: '#ffffff',
  };

  // Enhanced click handler for summary view
  const handleSummaryClick = (event: Readonly<Plotly.PlotMouseEvent>) => {
    const point = event.points[0];
    if (!point) return;
    
    // Get deals for the clicked cell
    const stage = point.x as string;
    const probability = point.y as string;
    const relevantDeals = deals.filter(d => 
      d.stage === stage && 
      d.probability === probability
    );
    
    // Set the deals to show in modal
    setSelectedDeal(relevantDeals[0]);
    
    // Switch to deals view
    setChartView('deals');
  };

  // Update click handler for deal points
  const handleDealClick = (event: Readonly<Plotly.PlotMouseEvent>) => {
    const point = event.points[0];
    if (!point?.customdata) return;
    
    const dealId = point.customdata as number;
    const deal = deals.find(d => d.id === dealId);
    if (deal) {
    setSelectedDeal(deal);
    setShowOverlay(true);
    }
  };

  const handleBackToSummary = () => {
    setChartView('summary');
    setLockedStage(null);
    setLockedProb(null);
    setSelectedStages([...summaryStages]);
    setSelectedProbs([...summaryProbabilities]);
    setSelectedOwners([...allOwners]);
  };

  return (
    <div style={{ width: '100%', padding: '24px', minWidth: '768px', fontSize: 18, color: '#444', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <TabList selectedValue={tab} onTabSelect={(_, data) => setTab(data.value as string)} style={{ marginBottom: 24, minHeight: 56, fontSize: 16 }}>
        <Tab value="active">Active Deals V1 (Exploration)</Tab>
        <Tab value="closed-lost">Closed Lost Deals</Tab>
        <Tab value="closed-won">Closed Won Deals</Tab>
        <Tab value="active-v2">Active Deals V2 (Exploration)</Tab>
      </TabList>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(37,99,235,0.08)',
        padding: '32px 32px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        boxSizing: 'border-box',
        color: '#23272f',
        position: 'relative',
        overflowY: 'auto',
        minHeight: 0,
      }}>
        {/* Active Deals Tab */}
        {tab === 'active' && (
          <>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: 16,
              paddingBottom: 0,
              borderBottom: 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <h2 style={{ 
                  fontSize: 18, 
                  fontWeight: 700, 
                  color: '#23272f', 
                  margin: 0,
                  letterSpacing: 0.5 
                }}>
                  Deal Pipeline
                </h2>
                {chartView === 'deals' && (
                  <Button appearance="outline" size="small" style={{ marginLeft: 16, border: '1px solid #2563eb' }} onClick={handleBackToSummary}>
                    Back to aggregated view
                  </Button>
                )}
              </div>
            </div>
            {/* Dashboard description or info text directly under header */}
            {chartView === 'summary' && (
              <>
                <div style={{ marginTop: 0, marginBottom: 8, maxWidth: 1000 }}>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>
                    This dashboard provides a visual summary of your deal pipeline, grouped by stage and probability.<br />
                    Click any cell to drill down and explore the underlying deals in detail.
                  </div>
                </div>
                <div style={{ borderBottom: '1px solid #e5e7eb', marginBottom: 16 }} />
              </>
            )}
            {chartView === 'deals' && lockedStage && lockedProb && (
              <>
                <div style={{ marginTop: 0, marginBottom: 8, maxWidth: 700 }}>
                  <span style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>
                    Showing deals for stage: <b>{lockedStage}</b> and probability: <b>{lockedProb}</b>
                  </span>
                </div>
                <div style={{ borderBottom: '1px solid #e5e7eb', marginBottom: 16 }} />
              </>
            )}
            {chartView === 'deals' && (
              <>
            <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Input
                placeholder="Search deal name..."
                value={search}
                    onChange={(_e, data) => setSearch(data.value)}
                style={{ width: 180 }}
              />
                  {/* Fluent UI Dropdown for owner selection, only owners with deals in filtered group */}
                  {(() => {
                    const ownersWithDeals = Array.from(new Set(filteredDeals.map(d => d.dealOwner).filter((o): o is string => Boolean(o))));
                    if (ownersWithDeals.length === 0) return null;
                    return (
              <Dropdown
                        placeholder="Select Owner"
                        value={selectedOwner}
                        onOptionSelect={(_e, data) => setSelectedOwner(data.selectedOptions[0] || '')}
                style={{ minWidth: 160 }}
              >
                        <Option key="all-owners" value="" text="All Owners">All Owners</Option>
                        {ownersWithDeals.map(owner => (
                          <Option key={owner} value={owner} text={owner}>{owner}</Option>
                ))}
              </Dropdown>
                    );
                  })()}
            </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0, height: '100%' }}>
              <div style={{ flex: 3, minWidth: 0, position: 'relative', height: '100%', overflow: 'visible' }}>
                    <div className="plot-container" style={{ position: 'relative', marginTop: 0, height: '100%' }}>
                  <Plot
                        data={chartView === 'deals' ? dealScatterData : summaryChartData}
                        layout={chartView === 'deals' ? dealChartLayout : summaryChartLayout}
                    config={{
                      displaylogo: false,
                      responsive: true,
                      displayModeBar: true,
                          modeBarButtons: chartView === 'deals'
                            ? [['zoomIn2d', 'zoomOut2d', 'pan2d', 'resetScale2d']]
                            : [['resetScale2d']],
                    }}
                        style={{ width: '100%', height: '100%' }}
                        onClick={chartView === 'deals' ? handleDealClick : handleSummaryClick}
                  />
                  {showOverlay && selectedDeal && (
                    <div
                      style={{
                      position: 'fixed',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(0,0,0,0.18)',
                      zIndex: 2000,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      }}
                      onClick={() => setShowOverlay(false)}
                    >
                      <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
                        <DealTooltipCard
                          dealName={selectedDeal.name}
                          stage={selectedDeal.stage}
                          dealSize={`$${selectedDeal.size.toLocaleString()}`}
                          dealOwner={selectedDeal.dealOwner || 'Sarah Kim'}
                          probability={selectedDeal.probability || 'Medium'}
                          negativeReason={selectedDeal.negativeReason || 'Long sales cycle due to complex approval process. Budget allocation pending final review. Technical integration requirements need clarification. Key stakeholder recently changed roles.'}
                          positiveReason={selectedDeal.positiveReason || 'Strong executive sponsorship secured. ROI analysis shows 3x return. Technical assessment completed successfully. Aligned with customer\'s strategic initiatives for 2024.'}
                          nextCall={selectedDeal.nextCall || 'Technical Deep Dive - 2:30 PM, Mar 15'}
                          nextCallLink={selectedDeal.nextCallLink || '#'}
                          stageDuration={selectedDeal.stageDuration || '30'}
                          meddicc={selectedDeal.meddicc || [
                            { label: 'M', color: '#f3f3f3' },
                            { label: 'E', color: '#c8e6c9', textColor: '#137333' },
                            { label: 'D', color: '#f3f3f3' },
                            { label: 'D', color: '#c8e6c9', textColor: '#137333' },
                            { label: 'I', color: '#c8e6c9', textColor: '#137333' },
                            { label: 'C', color: '#f3f3f3' },
                            { label: 'C', color: '#c8e6c9', textColor: '#137333' },
                          ]}
                          onClose={() => setShowOverlay(false)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
                  <div style={{ flex: 1, minWidth: 340, maxWidth: 420, marginLeft: 32, alignSelf: 'stretch', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(37,99,235,0.08)', padding: '20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}>
                    <div style={{ fontWeight: 700, color: '#1f2937', fontSize: 18, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  No Active Deals
                      <span style={{ fontWeight: 600, fontSize: 15, background: '#f3f4f6', color: '#64748b', borderRadius: 12, padding: '2px 10px', marginLeft: 8 }}>
                    {noActiveDeals.length}
                  </span>
                </div>
                {noActiveDeals.length === 0 ? (
                  <div style={{ color: '#b38600', opacity: 0.7 }}>All deals have upcoming activities!</div>
                ) : (
                      <ol style={{ margin: 0, padding: 0, listStyle: 'none', width: '100%', display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minHeight: 0, overflowY: 'auto' }}>
                        {noActiveDeals.map((deal) => (
                      <li key={deal.id} style={{
                            padding: '12px 16px',
                            borderRadius: 8,
                            background: '#f8fafc',
                            marginBottom: 0,
                            border: '1px solid #e2e8f0',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f1f5f9';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#f8fafc';
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                          onClick={() => setSelectedDeal(deal)}>
                            <div style={{ 
                              fontSize: 15,
                              fontWeight: 600,
                              color: '#1f2937',
                              marginBottom: 4,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <span>{deal.name}</span>
                              <span style={{ color: '#2563eb' }}>${deal.size.toLocaleString()}</span>
                            </div>
                            <div style={{ 
                        display: 'flex',
                              flexWrap: 'wrap',
                              gap: 12,
                              fontSize: 13,
                              color: '#64748b',
                              marginBottom: 4
                            }}>
                              <span>Owner: <b>{deal.dealOwner}</b></span>
                              {deal.lastActivity && (
                                <>
                                  <span>Last Activity: <b>{deal.lastActivityType}</b></span>
                                  <span>Date: <b>{deal.lastActivity}</b></span>
                                </>
                              )}
                            </div>
                            {deal.lastActivityStatus && (
                              <div style={{
                                display: 'inline-block',
                                background: deal.lastActivityStatus === 'Success' ? '#e6f9ed' : '#fdecea',
                                color: deal.lastActivityStatus === 'Success' ? '#137333' : '#d93025',
                                borderRadius: 6,
                                padding: '2px 8px',
                                fontSize: 12,
                                fontWeight: 600,
                              }}>
                                {deal.lastActivityStatus}
                              </div>
                            )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </>
        )}
            {chartView === 'summary' && (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {/* Filters Row: All filters in a single row, minWidth: 180px */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 8, alignItems: 'center' }}>
                  <Combobox
                    placeholder="Select Stages"
                    multiselect
                    selectedOptions={selectedStages}
                    onOptionSelect={(_e: React.SyntheticEvent, data: { selectedOptions: string[] }) => {
                      if (data.selectedOptions.includes('ALL')) {
                        setSelectedStages(selectedStages.length === summaryStages.length ? [] : [...summaryStages]);
                      } else {
                        setSelectedStages(data.selectedOptions);
                      }
                    }}
                    style={{ minWidth: 180 }}
                  >
                    <Option key="ALL" value="ALL" text="Select All">Select All</Option>
                    {summaryStages.map(stage => (
                      <Option key={stage} value={stage} text={stage}>{stage}</Option>
                    ))}
                  </Combobox>
                  <Combobox
                    placeholder="Select Probabilities"
                    multiselect
                    selectedOptions={selectedProbs}
                    onOptionSelect={(_e: React.SyntheticEvent, data: { selectedOptions: string[] }) => {
                      if (data.selectedOptions.includes('ALL')) {
                        setSelectedProbs(selectedProbs.length === summaryProbabilities.length ? [] : [...summaryProbabilities]);
                      } else {
                        setSelectedProbs(data.selectedOptions);
                      }
                    }}
                    style={{ minWidth: 180 }}
                  >
                    <Option key="ALL" value="ALL" text="Select All">Select All</Option>
                    {summaryProbabilities.map(prob => (
                      <Option key={prob} value={prob} text={prob}>{prob}</Option>
                    ))}
                  </Combobox>
                  <Combobox
                    placeholder="Select Owners"
                    multiselect
                    selectedOptions={selectedOwners}
                    onOptionSelect={(_e: React.SyntheticEvent, data: { selectedOptions: string[] }) => {
                      if (data.selectedOptions.includes('ALL')) {
                        setSelectedOwners(selectedOwners.length === allOwners.length ? [] : [...allOwners]);
                      } else {
                        setSelectedOwners(data.selectedOptions);
                      }
                    }}
                    style={{ minWidth: 180 }}
                    value={
                      selectedOwners.length === 0
                        ? ''
                        : selectedOwners.length === 1
                          ? selectedOwners[0]
                          : `${selectedOwners[0]} +${selectedOwners.length - 1}`
                    }
                  >
                    <Option key="ALL" value="ALL">Select All</Option>
                    {allOwners.map(owner => (
                      <Option key={owner} value={owner} text={owner}>{owner}</Option>
                    ))}
                  </Combobox>
                  <Button
                    size="small"
                    appearance="secondary"
                    style={{ marginLeft: 4 }}
                    onClick={() => {
                      setSelectedStages([...summaryStages]);
                      setSelectedProbs([...summaryProbabilities]);
                      setSelectedOwners([...allOwners]);
                      setSearch('');
                      setLockedStage(null);
                      setLockedProb(null);
                    }}
                  >
                    Reset to Default
                  </Button>
                </div>
                {/* Tags Row: All tags in a single row, wrap if needed */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                  {summaryStages.map(stage => (
                    selectedStages.includes(stage) ? (
                      <span key={stage} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: '#f3f4f6',
                        color: '#23272f',
                        borderRadius: 8,
                        padding: '2px 10px',
                        fontSize: 13,
                        fontWeight: 500,
                        marginRight: 4,
                        marginBottom: 2,
                        cursor: 'pointer',
                        border: '1px solid #e5e7eb',
                      }}>
                        {stage}
                        <span
                          style={{ marginLeft: 6, fontSize: 15, cursor: 'pointer', color: '#64748b' }}
                          onClick={() => setSelectedStages(selectedStages.filter(s => s !== stage))}
                        >×</span>
                      </span>
                    ) : null
                  ))}
                  {summaryProbabilities.map(prob => (
                    selectedProbs.includes(prob) ? (
                      <span key={prob} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: probabilityColors[prob],
                        color: probabilityTextColors[prob],
                        borderRadius: 8,
                        padding: '2px 10px',
                        fontSize: 13,
                        fontWeight: 500,
                        marginRight: 4,
                        marginBottom: 2,
                        cursor: 'pointer',
                        border: '1px solid #e5e7eb',
                      }}>
                        {prob}
                        <span
                          style={{ marginLeft: 6, fontSize: 15, cursor: 'pointer', color: probabilityTextColors[prob] }}
                          onClick={() => setSelectedProbs(selectedProbs.filter(p => p !== prob))}
                        >×</span>
                      </span>
                    ) : null
                  ))}
                </div>
                <div style={{ width: '100%', display: 'flex', gap: 32, height: '100%' }}>
                  {/* Column 1: Gradient bar */}
                  <div style={{
                    width: 8,
                    background: 'linear-gradient(to top, #d93025 0%, #ffd600 50%, #137333 100%)',
                    borderRadius: '8px',
                    margin: '0 0 40px 0',
                    alignSelf: 'stretch',
                  }} />
                  {/* Column 2: Chart */}
                  <div style={{
                    background: '#f8fafc',
                    borderRadius: 12,
                    border: '1px solid #e5e7eb',
                    padding: 24,
                    display: 'grid',
                    gridTemplateColumns: `100px repeat(${summaryStages.length}, 1fr)`,
                    gridTemplateRows: `repeat(${summaryProbabilities.length}, 1fr) 40px`,
                    gap: 16,
                    alignItems: 'stretch',
                    justifyItems: 'stretch',
                    minWidth: 400,
                    minHeight: 300,
                    flex: 1,
                    width: '100%',
                    position: 'relative',
                  }}>
                    {/* Y-axis labels */}
                    {summaryProbabilities.map((prob, rowIdx) => (
                      <div key={prob} style={{
                        gridColumn: 1,
                        gridRow: rowIdx + 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: 12,
                        fontWeight: 500,
                        fontSize: 14,
                        color: '#64748b',
                        background: '#f7f7f7',
                        borderRadius: 8,
                        borderBottom: '1px solid #eee',
                      }}>
                        {prob}
                      </div>
                    ))}
                    {/* Matrix cells */}
                    {summaryProbabilities.map((prob, rowIdx) =>
                      summaryStages.map((stage, colIdx) => {
                        // Only show cell if all filters match
                        if (!selectedStages.includes(stage) || !selectedProbs.includes(prob)) return null;
                        // Only count deals with selected owners
                        const cellDeals = deals.filter(d => d.stage === stage && d.probability === prob && typeof d.dealOwner === 'string' && selectedOwners.includes(d.dealOwner));
                        const cell = {
                          totalAmount: cellDeals.reduce((sum, d) => sum + d.size, 0),
                          dealCount: cellDeals.length,
                        };
                        const isEmpty = cell.dealCount === 0;
                        if (isEmpty) {
                          return <div key={stage + prob} style={{ gridColumn: colIdx + 2, gridRow: rowIdx + 1 }} />;
                        }
                        return (
                          <div
                            key={stage + prob}
                            style={{
                              gridColumn: colIdx + 2,
                              gridRow: rowIdx + 1,
                              background: '#fff',
                              borderRadius: 10,
                              boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                              border: '1px solid #f0f0f0',
                              padding: '12px 16px',
                              minHeight: 60,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                              gap: 4,
                              cursor: 'pointer',
                              transition: 'box-shadow 0.2s',
                            }}
                            onClick={() => {
                              setSelectedStages([stage]);
                              setSelectedProbs([prob]);
                              setLockedStage(stage);
                              setLockedProb(prob);
                              setChartView('deals');
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,99,235,0.08)';
                              const amountDiv = e.currentTarget.querySelector('.summary-amount');
                              if (amountDiv) {
                                (amountDiv as HTMLElement).style.color = '#2563eb';
                                (amountDiv as HTMLElement).style.textDecoration = 'underline';
                              }
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(37,99,235,0.08)';
                              const amountDiv = e.currentTarget.querySelector('.summary-amount');
                              if (amountDiv) {
                                (amountDiv as HTMLElement).style.color = '#23272f';
                                (amountDiv as HTMLElement).style.textDecoration = 'none';
                              }
                            }}
                          >
                            <div className="summary-amount" style={{
                              fontWeight: 700,
                              fontSize: 15,
                              color: '#23272f',
                              marginBottom: 0,
                              transition: 'color 0.2s, text-decoration 0.2s',
                            }}>
                              ${cell.totalAmount.toLocaleString()}
                            </div>
                            <div style={{ fontSize: 13, color: '#64748b' }}>{cell.dealCount} Deals</div>
                          </div>
                        );
                      })
                    )}
                    {/* X-axis labels at the bottom */}
                    <div style={{ gridColumn: '1 / span 2', gridRow: summaryProbabilities.length + 1, background: '#f8fafc' }}></div>
                    {summaryStages.map((stage, colIdx) => (
                      <div key={stage} style={{
                        gridColumn: colIdx + 2,
                        gridRow: summaryProbabilities.length + 1,
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: 15,
                        padding: '10px 0',
                        color: '#64748b',
                        background: '#f7f7f7',
                        borderRadius: 8,
                        borderTop: '1px solid #eee',
                      }}>{stage}</div>
                    ))}
                  </div>
                  {/* Column 3: Card Section */}
                  <div style={{ 
                    flex: '0 0 340px', 
                    minWidth: 340,
                    maxWidth: 340,
                    alignSelf: 'stretch', 
                    background: '#fff', 
                    borderRadius: 12, 
                    boxShadow: '0 2px 8px rgba(37,99,235,0.08)', 
                    padding: '20px 24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%' 
                  }}>
                    <div style={{ 
                      fontWeight: 700, 
                      color: '#1f2937', 
                      fontSize: 18, 
                      marginBottom: 16, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 8 
                    }}>
                      Summary Stats
                      <span style={{ 
                        fontWeight: 400, 
                        fontSize: 13, 
                        background: '#f3f4f6', 
                        color: '#64748b', 
                        borderRadius: 12, 
                        padding: '2px 10px', 
                        marginLeft: 'auto' 
                      }}>
                        Coming Soon
                      </span>
                    </div>
                    <div style={{ 
                      flex: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 16,
                      color: '#64748b',
                      fontSize: 15
                    }}>
                      <div style={{ 
                        padding: '16px', 
                        background: '#f8fafc', 
                        borderRadius: 8, 
                        border: '1px solid #e2e8f0' 
                      }}>
                        Placeholder content
                      </div>
                      <div style={{ 
                        padding: '16px', 
                        background: '#f8fafc', 
                        borderRadius: 8, 
                        border: '1px solid #e2e8f0' 
                      }}>
                        More content coming soon
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Closed Lost Deals Tab */}
        {tab === 'closed-lost' && (
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
            flex: 1,
            color: '#64748b',
            background: '#fff',
            borderRadius: 16
          }}>
            <div style={{
              width: 240,
              height: 160,
              background: '#f8fafc',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              border: '1px dashed #cbd5e1'
            }}>
              <span style={{ fontSize: 48, color: '#94a3b8' }}>📊</span>
            </div>
            <h3 style={{ 
              fontSize: 18,
              fontWeight: 600,
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              No Closed Lost Deals
            </h3>
            <p style={{ 
              fontSize: 15,
              color: '#64748b',
              margin: 0,
              textAlign: 'center',
              maxWidth: 400
            }}>
              Closed lost deals will appear here. Track and analyze your lost opportunities to improve win rates.
            </p>
          </div>
        )}

        {/* Closed Won Deals Tab */}
        {tab === 'closed-won' && (
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
            flex: 1,
            color: '#64748b',
            background: '#fff',
            borderRadius: 16
          }}>
            <div style={{
              width: 240,
              height: 160,
              background: '#f8fafc',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              border: '1px dashed #cbd5e1'
            }}>
              <span style={{ fontSize: 48, color: '#94a3b8' }}>🎉</span>
            </div>
            <h3 style={{ 
              fontSize: 18,
              fontWeight: 600,
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              No Closed Won Deals
            </h3>
            <p style={{ 
              fontSize: 15,
              color: '#64748b',
              margin: 0,
              textAlign: 'center',
              maxWidth: 400
            }}>
              Closed won deals will appear here. Celebrate your successes and track your revenue growth.
            </p>
          </div>
        )}

        {/* Active Deals V2 Tab */}
        {tab === 'active-v2' && (
          <DealPipelineV2 />
        )}
      </div>
      <style>
        {`
          .ms-Dropdown {
            height: 32px !important;
          }
          .ms-Dropdown-title,
          .ms-Dropdown-titleIsPlaceHolder {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            height: 32px !important;
            line-height: 32px !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .ms-Dropdown-title > span {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            display: inline-block !important;
            max-width: calc(100% - 20px) !important;
          }
          .ms-Dropdown-selectedItems {
            display: none !important;
          }
          .ms-Dropdown-caretDownWrapper {
            height: 32px !important;
            line-height: 32px !important;
          }
          .ms-Dropdown-items {
            max-height: 300px !important;
            overflow-y: auto !important;
          }
          .summary-cell:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37,99,235,0.12);
          }
          /* Custom: Light blue background for Plotly modebar (chart controls) */
          .js-plotly-plot .modebar {
            background: #e6f4ff !important;
            border-radius: 8px !important;
            box-shadow: 0 2px 8px rgba(37,99,235,0.08);
            padding: 2px 8px !important;
            top: 16px !important;
            right: 16px !important;
          }
          /* Remove any white background from modebar or its children */
          .js-plotly-plot .modebar, .js-plotly-plot .modebar * {
            background: transparent !important;
          }
          .js-plotly-plot .modebar {
            background: #e6f4ff !important;
          }
          /* Highlight the active modebar button */
          .js-plotly-plot .modebar-btn.active {
            background: #bae6fd !important;
            border-radius: 6px !important;
          }
        `}
      </style>
      {/* Note: To unselect Pan mode in Plotly, click the Pan button again to toggle it off and return to Zoom mode. */}
    </div>
  );
}

// --- V2 Dashboard (all new, not reused from V1) ---
function DealPipelineV2() {
  // V2 state
  const [viewModeV2, setViewModeV2] = React.useState<'aggregated' | 'deals'>('aggregated');
  const [selectedStagesV2, setSelectedStagesV2] = React.useState(stagesV2);
  const [selectedProbsV2, setSelectedProbsV2] = React.useState(probabilitiesV2);
  const [selectedOwnersV2, setSelectedOwnersV2] = React.useState(ownersV2);
  const [selectedSmartV2, setSelectedSmartV2] = React.useState(['AI Match', 'Recent Activity']);
  const [selectedDealIdsV2, setSelectedDealIdsV2] = React.useState<number[] | null>(null);

  // Filtered deals for V2
  const filteredDealsV2 = sampleDealsV2.filter(d =>
    selectedStagesV2.includes(d.stage) &&
    selectedProbsV2.includes(d.probability) &&
    selectedOwnersV2.includes(d.owner)
  );

  // Tag removal handlers
  const removeStageTag = (stage: string) => setSelectedStagesV2(selectedStagesV2.filter(s => s !== stage));
  const removeProbTag = (prob: string) => setSelectedProbsV2(selectedProbsV2.filter(p => p !== prob));

  // Select All logic
  const handleStageSelect = (_e: React.SyntheticEvent, data: { selectedOptions: string[] }) => {
    if (data.selectedOptions.includes('ALL')) {
      setSelectedStagesV2(selectedStagesV2.length === stagesV2.length ? [] : [...stagesV2]);
    } else {
      setSelectedStagesV2(data.selectedOptions as string[]);
    }
  };
  const handleProbSelect = (_e: React.SyntheticEvent, data: { selectedOptions: string[] }) => {
    if (data.selectedOptions.includes('ALL')) {
      setSelectedProbsV2(selectedProbsV2.length === probabilitiesV2.length ? [] : [...probabilitiesV2]);
    } else {
      setSelectedProbsV2(data.selectedOptions as string[]);
    }
  };
  const handleOwnerSelect = (_e: React.SyntheticEvent, data: { selectedOptions: string[] }) => {
    if (data.selectedOptions.includes('ALL')) {
      setSelectedOwnersV2(selectedOwnersV2.length === ownersV2.length ? [] : [...ownersV2]);
    } else {
      setSelectedOwnersV2(data.selectedOptions as string[]);
    }
  };
  const handleSmartSelect = (_e: React.SyntheticEvent, data: { selectedOptions: string[] }) => {
    if (data.selectedOptions.includes('ALL')) {
      setSelectedSmartV2(selectedSmartV2.length === smartOptionsV2.length ? [] : [...smartOptionsV2]);
    } else {
      setSelectedSmartV2(data.selectedOptions as string[]);
    }
  };

  // Probability color map for tags
  const probColorsV2: { [key: string]: string } = {
    'Very Low': '#fdecea',
    'Low': '#fff4e5',
    'Medium': '#fffbe6',
    'High': '#e6f4ff',
    'Very High': '#e6f9ed',
  };
  const probTextColorsV2: { [key: string]: string } = {
    'Very Low': '#d93025',
    'Low': '#ea8600',
    'Medium': '#b38600',
    'High': '#2563eb',
    'Very High': '#137333',
  };

  // For the V2 chart, reverse the probabilitiesV2 order for Y-axis and grid rows
  const probabilitiesV2Reversed = [...probabilitiesV2].reverse();

  // --- V2 Individual Deals Scatter Chart Data ---
  const dealsToShow = selectedDealIdsV2
    ? filteredDealsV2.filter(d => selectedDealIdsV2.includes(d.id))
    : filteredDealsV2;

  const v2ScatterData: Array<Partial<Plotly.ScatterData>> = [
    {
      x: dealsToShow.map(d => d.stage),
      y: dealsToShow.map(d => d.probability),
      text: dealsToShow.map(d => d.name),
      customdata: dealsToShow.map(d => d.id),
      mode: 'text+markers' as const,
      type: 'scatter' as const,
      textposition: 'top right',
      marker: {
        size: 18,
        color: dealsToShow.map(d => {
          switch (d.probability) {
            case 'Very Low': return '#fdecea';
            case 'Low': return '#fff4e5';
            case 'Medium': return '#fffbe6';
            case 'High': return '#e6f4ff';
            case 'Very High': return '#e6f9ed';
            default: return '#e0e7ff';
          }
        }),
        line: { width: 2, color: '#2563eb' },
        symbol: 'circle',
      },
      name: 'Deals',
      showlegend: false,
    }
  ];

  const v2ScatterLayout: Partial<Plotly.Layout> = {
    title: '',
    xaxis: {
      title: 'Deal Stage',
      type: 'category' as const,
      categoryorder: 'array' as const,
      categoryarray: stagesV2,
      showgrid: true,
      gridcolor: '#e5e7eb',
      zeroline: false,
      showline: true,
      linecolor: '#888',
      linewidth: 2,
    },
    yaxis: {
      title: 'Probability',
      type: 'category' as const,
      categoryorder: 'array' as const,
      categoryarray: probabilitiesV2,
      showgrid: true,
      gridcolor: '#e5e7eb',
      zeroline: false,
      showline: true,
      linecolor: '#888',
      linewidth: 2,
    },
    dragmode: 'zoom',
    autosize: true,
    height: 600,
    margin: { t: 40, l: 80, r: 40, b: 80 },
    showlegend: false,
    plot_bgcolor: '#fff',
  };

  // Handler for box/lasso select
  const handleV2ScatterSelected = (event: Readonly<Plotly.PlotSelectionEvent>) => {
    if (!event || !event.points) return;
    const ids = event.points.map(pt => pt.customdata as number).filter(Boolean);
    setSelectedDealIdsV2(ids.length > 0 ? ids : null);
  };

  // Handler to clear selection
  const clearV2Selection = () => setSelectedDealIdsV2(null);

  return (
    <div style={{ padding: 0, textAlign: 'left', color: '#23272f' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Deal Pipeline</h2>
        <div style={{ display: 'flex', gap: 0 }}>
          <TabList selectedValue={viewModeV2} onTabSelect={(_, data) => setViewModeV2(data.value as 'aggregated' | 'deals')} size="medium" style={{ background: '#f3f4f6', borderRadius: 8, padding: 2 }}>
            <Tab value="aggregated">Aggregated View</Tab>
            <Tab value="deals">Individual Deals</Tab>
          </TabList>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid #e5e7eb', marginBottom: 16 }} />

      {/* V2 Filters (Fluent UI Dropdowns) */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 8, alignItems: 'center' }}>
        <Dropdown
          aria-label="Stage Filter V2"
          multiselect
          placeholder="Select Stages"
          selectedOptions={selectedStagesV2}
          onOptionSelect={handleStageSelect}
          style={{ minWidth: 160 }}
          value={
            selectedStagesV2.length === 0
              ? ''
              : selectedStagesV2.length === 1
                ? selectedStagesV2[0]
                : `${selectedStagesV2[0]} +${selectedStagesV2.length - 1}`
          }
        >
          <Option key="ALL" value="ALL">Select All</Option>
          {stagesV2.map(stage => (
            <Option key={stage} value={stage}>{stage}</Option>
          ))}
        </Dropdown>
        <Dropdown
          aria-label="Probability Filter V2"
          multiselect
          placeholder="Select Probabilities"
          selectedOptions={selectedProbsV2}
          onOptionSelect={handleProbSelect}
          style={{ minWidth: 160 }}
          value={
            selectedProbsV2.length === 0
              ? ''
              : selectedProbsV2.length === 1
                ? selectedProbsV2[0]
                : `${selectedProbsV2[0]} +${selectedProbsV2.length - 1}`
          }
        >
          <Option key="ALL" value="ALL">Select All</Option>
          {probabilitiesV2Reversed.map(prob => (
            <Option key={prob} value={prob}>{prob}</Option>
          ))}
        </Dropdown>
        <Dropdown
          aria-label="Owner Filter V2"
          multiselect
          placeholder="Select Owners"
          selectedOptions={selectedOwnersV2}
          onOptionSelect={handleOwnerSelect}
          style={{ minWidth: 160 }}
          value={
            selectedOwnersV2.length === 0
              ? ''
              : selectedOwnersV2.length === 1
                ? selectedOwnersV2[0]
                : `${selectedOwnersV2[0]} +${selectedOwnersV2.length - 1}`
          }
        >
          <Option key="ALL" value="ALL">Select All</Option>
          {ownersV2.map(owner => (
            <Option key={owner} value={owner}>{owner}</Option>
          ))}
        </Dropdown>
        <Dropdown
          aria-label="Smart Search V2"
          multiselect
          placeholder="Smart Search"
          selectedOptions={selectedSmartV2}
          onOptionSelect={handleSmartSelect}
          style={{ minWidth: 160 }}
          value={
            selectedSmartV2.length === 0
              ? ''
              : selectedSmartV2.length === 1
                ? selectedSmartV2[0]
                : `${selectedSmartV2[0]} +${selectedSmartV2.length - 1}`
          }
        >
          <Option key="ALL" value="ALL">Select All</Option>
          {smartOptionsV2.map(opt => (
            <Option key={opt} value={opt}>{opt}</Option>
          ))}
        </Dropdown>
        <Button
          size="small"
          appearance="secondary"
          style={{ marginLeft: 4 }}
          onClick={() => {
            setSelectedStagesV2(stagesV2);
            setSelectedProbsV2(probabilitiesV2);
            setSelectedOwnersV2(ownersV2);
            setSelectedSmartV2(['AI Match', 'Recent Activity']);
            setSelectedDealIdsV2(null);
          }}
        >
          Reset to Default
        </Button>
      </div>

      {/* Tag row for selected filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        {selectedStagesV2.map(stage => (
          <span key={stage} style={{
            display: 'inline-flex', alignItems: 'center', background: '#f3f4f6', color: '#23272f', borderRadius: 8, padding: '2px 10px', fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb', marginRight: 2, marginBottom: 2, cursor: 'pointer',
          }}>
            {stage}
            <span style={{ marginLeft: 6, fontSize: 15, cursor: 'pointer', color: '#64748b' }} onClick={() => removeStageTag(stage)}>×</span>
          </span>
        ))}
        {selectedProbsV2.map(prob => (
          <span key={prob} style={{
            display: 'inline-flex', alignItems: 'center', background: probColorsV2[prob], color: probTextColorsV2[prob], borderRadius: 8, padding: '2px 10px', fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb', marginRight: 2, marginBottom: 2, cursor: 'pointer',
          }}>
            {prob}
            <span style={{ marginLeft: 6, fontSize: 15, cursor: 'pointer', color: probTextColorsV2[prob] }} onClick={() => removeProbTag(prob)}>×</span>
          </span>
        ))}
      </div>

      {/* V2 3-column layout */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'stretch', width: '100%' }}>
        <GradientBarV2 />
        <div style={{ flex: 1, minWidth: 400, minHeight: 300, background: '#f8fafc', borderRadius: 12, border: '1px solid #e5e7eb', padding: 24, display: 'grid', gridTemplateColumns: `100px repeat(${stagesV2.length}, 1fr)`, gridTemplateRows: `repeat(${probabilitiesV2.length}, 1fr) 40px`, gap: 16, alignItems: 'stretch', justifyItems: 'stretch', position: 'relative' }}>
          {viewModeV2 === 'aggregated' && (
            <>
              {/* Y-axis labels (probabilities) */}
              {probabilitiesV2Reversed.map((prob, rowIdx) => (
                <div key={prob} style={{
                  gridColumn: 1,
                  gridRow: rowIdx + 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 12, fontWeight: 500, fontSize: 14, color: '#64748b', background: '#f7f7f7', borderRadius: 8, borderBottom: '1px solid #eee',
                }}>
                  {prob}
                </div>
              ))}
              {/* Matrix cells */}
              {probabilitiesV2Reversed.map((prob, rowIdx) =>
                stagesV2.map((stage, colIdx) => {
                  const cellDeals = filteredDealsV2.filter(d => d.stage === stage && d.probability === prob);
                  const totalAmount = cellDeals.reduce((sum, d) => sum + d.size, 0);
                  if (cellDeals.length === 0) {
                    return <div key={stage + prob} style={{ gridColumn: colIdx + 2, gridRow: rowIdx + 1 }} />;
                  }
                  return (
                    <div
                      key={stage + prob}
                      style={{
                        gridColumn: colIdx + 2,
                        gridRow: rowIdx + 1,
                        background: '#fff',
                        borderRadius: 10,
                        boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                        border: '1px solid #f0f0f0',
                        padding: '12px 16px',
                        minHeight: 60,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        gap: 4
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#23272f' }}>${totalAmount.toLocaleString()}</div>
                      <div style={{ fontSize: 13, color: '#64748b' }}>{cellDeals.length} Deals</div>
                    </div>
                  );
                })
              )}
              {/* X-axis labels (stages) at the bottom */}
              <div style={{ gridColumn: '1 / span 2', gridRow: probabilitiesV2.length + 1, background: '#f8fafc' }}></div>
              {stagesV2.map((stage, colIdx) => (
                <div
                  key={stage}
                  style={{
                    gridColumn: colIdx + 2,
                    gridRow: probabilitiesV2.length + 1,
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: 15,
                    padding: '10px 0',
                    color: '#64748b',
                    background: '#f7f7f7',
                    borderRadius: 8,
                    borderTop: '1px solid #eee',
                  }}
                >
                  {stage}
                </div>
              ))}
            </>
          )}
          {viewModeV2 === 'deals' && (
            <div style={{ width: '100%', height: 600, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(37,99,235,0.08)', border: '1px solid #e5e7eb', padding: 0, gridColumn: `1 / span ${stagesV2.length + 1}`, gridRow: `1 / span ${probabilitiesV2.length}` }}>
              <Plot
                data={v2ScatterData}
                layout={v2ScatterLayout}
                config={{
                  displaylogo: false,
                  responsive: true,
                  displayModeBar: true,
                  modeBarButtonsToAdd: [],
                  modeBarButtons: [
                    ['zoomIn2d', 'zoomOut2d', 'pan2d', 'resetScale2d']
                  ],
                }}
                style={{ width: '100%', height: '100%' }}
                onSelected={handleV2ScatterSelected}
              />
              {selectedDealIdsV2 && (
                <div style={{ padding: 16, background: '#f3f4f6', borderRadius: 8, margin: 16, display: 'inline-block' }}>
                  <span style={{ color: '#2563eb', fontWeight: 600 }}>{dealsToShow.length} selected</span>
                  <Button appearance="secondary" size="small" style={{ marginLeft: 16 }} onClick={clearV2Selection}>Clear selection</Button>
                </div>
              )}
            </div>
          )}
        </div>
        <CardSectionV2 />
      </div>
    </div>
  );
}

function GradientBarV2() {
  return (
    <div style={{ width: 10, borderRadius: 8, background: 'linear-gradient(to top, #d93025 0%, #ffd600 50%, #137333 100%)', margin: '0 0 40px 0', alignSelf: 'stretch' }} />
  );
}

function CardSectionV2() {
  return (
    <div style={{ flex: '0 0 340px', minWidth: 340, maxWidth: 340, alignSelf: 'stretch', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(37,99,235,0.08)', padding: '20px 24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ fontWeight: 700, color: '#1f2937', fontSize: 18, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        Card Section V2
      </div>
      <div style={{ color: '#64748b', fontSize: 15 }}>
        Placeholder for V2 card content.
      </div>
    </div>
  );
}

// V2 sample data and filter options
const stagesV2 = ['Prospecting', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won'];
const probabilitiesV2 = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
const ownersV2 = ['Alice', 'Bob', 'Carol'];
const sampleDealsV2 = [
  { id: 1, name: 'Acme Corp', size: 120000, stage: 'Prospecting', probability: 'Medium', owner: 'Alice', date: '2024-06-01' },
  { id: 2, name: 'Beta LLC', size: 80000, stage: 'Qualified', probability: 'High', owner: 'Bob', date: '2024-06-05' },
  { id: 3, name: 'Gamma Inc', size: 50000, stage: 'Proposal', probability: 'Low', owner: 'Carol', date: '2024-06-10' },
  { id: 4, name: 'Delta Ltd', size: 200000, stage: 'Negotiation', probability: 'Very High', owner: 'Alice', date: '2024-06-15' },
  { id: 5, name: 'Epsilon AG', size: 95000, stage: 'Closed Won', probability: 'Medium', owner: 'Bob', date: '2024-06-20' },
];

const smartOptionsV2 = ['AI Match', 'Recent Activity', 'High Value', 'Needs Attention']; 

// Ensure each stage/probability/owner group in V2 has at least 15 deals
(function ensureMinDealsPerCellV2() {
  let maxId = sampleDealsV2.reduce((max, d) => Math.max(max, d.id), 0);
  const names = [
    'Acme', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
    'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon',
    'Phi', 'Chi', 'Psi', 'Omega', 'Alpha', 'Orion', 'Nova', 'Pioneer', 'Zenith', 'Atlas',
    'Vega', 'Lyra', 'Cygnus', 'Draco', 'Phoenix', 'Hydra', 'Pegasus', 'Aurora', 'Lynx', 'Leo'
  ];
  let nameIdx = 0;
  const skipCombos = [
    { stage: 'Prospecting', prob: 'Very Low', owner: 'Alice' },
    { stage: 'Qualified', prob: 'High', owner: 'Bob' },
    { stage: 'Proposal', prob: 'Medium', owner: 'Carol' },
  ];
  for (const stage of stagesV2) {
    for (const prob of probabilitiesV2) {
      for (const owner of ownersV2) {
        // Skip a few combos to demonstrate empty cells
        if (skipCombos.some(c => c.stage === stage && c.prob === prob && c.owner === owner)) continue;
        const group = sampleDealsV2.filter(d => d.stage === stage && d.probability === prob && d.owner === owner);
        const toAdd = 15 - group.length;
        for (let i = 0; i < toAdd; ++i) {
          maxId++;
          sampleDealsV2.push({
            id: maxId,
            name: `${names[nameIdx % names.length]} AutoGen ${maxId}`,
            size: 20000 + Math.floor(Math.random() * 180000),
            stage,
            probability: prob,
            owner,
            date: `2024-06-${String(1 + (maxId % 28)).padStart(2, '0')}`,
          });
          nameIdx++;
        }
      }
    }
  }
})(); 