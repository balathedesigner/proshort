import * as React from 'react';
import { 
  Card, 
  Text,
  Avatar,
  Badge,
  tokens,
  Divider,
  Button
} from '@fluentui/react-components';
import {
  PersonRegular,
  VideoRegular,
  CheckmarkCircleRegular,
  WarningRegular,
} from '@fluentui/react-icons';

interface MeddiccBadge {
  label: string;
  color: string;
  textColor?: string;
}

interface DealTooltipCardProps {
  dealName: string;
  stage: string;
  dealSize: string;
  dealOwner: string;
  probability: string;
  negativeReason: string;
  positiveReason: string;
  nextCall: string;
  nextCallLink: string;
  meddicc: MeddiccBadge[];
  stageDuration?: string;
  onClose?: () => void;
}

const probabilityColors: Record<string, { bg: string; text: string }> = {
  'Very Low': { bg: '#fdecea', text: '#d93025' },
  'Low': { bg: '#fff4e5', text: '#ea8600' },
  'Medium': { bg: '#fffbe6', text: '#b38600' },
  'High': { bg: '#e6f4ff', text: '#2563eb' },
  'Very High': { bg: '#e6f9ed', text: '#137333' }
};

const DealTooltipCard: React.FC<DealTooltipCardProps> = ({
  dealName,
  stage,
  dealSize,
  dealOwner,
  probability,
  negativeReason,
  positiveReason,
  nextCall,
  nextCallLink,
  meddicc,
  stageDuration,
  onClose,
}) => {
  const probColors = probabilityColors[probability as keyof typeof probabilityColors] || 
                    probabilityColors['Medium'];

  return (
    <div style={{ position: 'relative', width: 600 }}>
      <Card 
        style={{ 
          width: '100%',
          boxShadow: tokens.shadow16,
          borderRadius: 16,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Deal Name Row with Stage Duration */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 40 }}>
          <Text 
            weight="bold" 
            size={800} 
            style={{ 
              color: tokens.colorNeutralForeground1,
              display: 'block',
              fontSize: '24px',
              lineHeight: '32px'
            }}
          >
            {dealName}
          </Text>
          {stageDuration && (
            <Badge
              style={{
                background: '#fff4e5',
                color: '#ea8600',
                fontSize: '13px',
                padding: '0 10px',
                fontWeight: 500,
                marginLeft: 16,
                whiteSpace: 'nowrap',
                width: 'auto',
                minWidth: 0,
                maxWidth: '100%',
              }}
            >
              {stageDuration} days in stage
            </Badge>
          )}
        </div>

        {/* Deal Info Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          background: tokens.colorNeutralBackground2,
          padding: '16px',
          borderRadius: '12px'
        }}>
          {/* Stage */}
          <div>
            <Text 
              weight="medium"
              style={{ 
                marginBottom: 8,
                display: 'block',
                color: tokens.colorNeutralForeground2,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Stage
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Badge 
                appearance="outline"
                style={{ 
                  fontSize: '14px',
                  padding: '0 10px',
                  background: tokens.colorNeutralBackground1,
                  fontWeight: 500,
                  width: 'auto',
                  minWidth: 0,
                  maxWidth: '100%',
                }}
              >
                {stage}
              </Badge>
            </div>
          </div>

          {/* Deal Size */}
          <div>
            <Text 
              weight="medium"
              style={{ 
                marginBottom: 8,
                display: 'block',
                color: tokens.colorNeutralForeground2,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Size
            </Text>
            <Badge 
              appearance="filled"
              color="brand"
              style={{ 
                fontSize: '14px',
                padding: '0 10px',
                fontWeight: 500,
                width: 'auto',
                minWidth: 0,
                maxWidth: '100%',
              }}
            >
              {dealSize}
            </Badge>
          </div>

          {/* Probability */}
          <div>
            <Text 
              weight="medium"
              style={{ 
                marginBottom: 8,
                display: 'block',
                color: tokens.colorNeutralForeground2,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Probability
            </Text>
            <Badge 
              style={{ 
                background: probColors.bg,
                color: probColors.text,
                fontSize: '14px',
                padding: '0 10px',
                fontWeight: 500,
                width: 'auto',
                minWidth: 0,
                maxWidth: '100%',
              }}
            >
              {probability}
            </Badge>
          </div>
        </div>

        {/* Deal Owner */}
        <div>
          <Text 
            weight="semibold" 
            style={{ 
              marginBottom: 8, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              color: tokens.colorNeutralForeground2,
              fontSize: '14px'
            }}
          >
            <PersonRegular /> Deal Owner
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar 
              name={dealOwner}
              size={40}
              color="brand"
            />
            <Text 
              weight="semibold" 
              size={400}
              style={{
                fontSize: '15px',
                lineHeight: '20px'
              }}
            >
              {dealOwner}
            </Text>
          </div>
        </div>

        <Divider />

        {/* Reasons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            color: tokens.colorStatusDangerForeground1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            background: '#fef3f2',
            padding: '16px',
            borderRadius: '8px'
          }}>
            <WarningRegular style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <Text weight="semibold" style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>Areas of Concern</Text>
              <Text style={{ fontSize: '14px', lineHeight: '20px' }}>{negativeReason}</Text>
            </div>
          </div>
          <div style={{ 
            color: tokens.colorStatusSuccessForeground1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            background: '#ecfdf3',
            padding: '16px',
            borderRadius: '8px'
          }}>
            <CheckmarkCircleRegular style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <Text weight="semibold" style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>Positive Signals</Text>
              <Text style={{ fontSize: '14px', lineHeight: '20px' }}>{positiveReason}</Text>
            </div>
          </div>
        </div>

        {/* Next Call */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: tokens.colorNeutralForeground1,
          background: tokens.colorNeutralBackground2,
          padding: '16px',
          borderRadius: '8px'
        }}>
          <VideoRegular style={{ flexShrink: 0 }} />
          <Text style={{ fontSize: '14px' }}>
            Next Call:{' '}
            <a 
              href={nextCallLink}
              style={{ 
                color: tokens.colorBrandForegroundLink,
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              {nextCall}
            </a>
          </Text>
        </div>

        {/* MEDDICC Badges and Know More button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {meddicc.map((badge, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: badge.color,
                  color: badge.textColor || tokens.colorNeutralForeground2,
                  textAlign: 'center',
                  lineHeight: '32px',
                  fontWeight: 600,
                  fontSize: 15,
                  border: `1px solid ${tokens.colorNeutralStroke1}`
                }}
              >
                {badge.label}
              </span>
            ))}
          </div>
          <Button appearance="primary" size="medium" style={{ marginLeft: 16 }}>
            Know More
          </Button>
        </div>
      </Card>
      {/* Single close button absolutely positioned top right, outside card padding, not overlapping badge */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'transparent',
          border: 'none',
          fontSize: 24,
          color: '#666',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          transition: 'all 0.2s ease',
          zIndex: 10,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.05)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'transparent';
        }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default DealTooltipCard; 