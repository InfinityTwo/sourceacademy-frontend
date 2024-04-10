import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { ReactNode } from 'react';
import { ProgressStatus, ProgressStatuses } from 'src/commons/assessment/AssessmentTypes';
import { ColumnFilter } from 'src/features/grading/GradingTypes';

declare const sizeValues: readonly ['xs', 'sm', 'md', 'lg', 'xl'];
declare type Size = (typeof sizeValues)[number];

interface BadgeProps {
  text: string;
  color?: string;
  size?: Size;
  icon?: () => ReactNode;
}

const Badge: React.FC<BadgeProps> = (props: BadgeProps) => {
  return (
    <div
      className={'grading-badge grading-badge-' + (props.size ? props.size : 'sm')}
      style={{
        color: props.color ? props.color[1] : '#000000',
        backgroundColor: props.color ? props.color[0] + '40' : ''
      }}
    >
      {props.icon ? props.icon() : <></>}
      <span className="grading-badge-text">{props.text}</span>
    </div>
  );
};

// First colour is bg, second is text (text is more saturated/darker). Colours are referenced from tailwind css.
const AVAILABLE_COLORS = {
  indigo: ['#818cf8', '#4f46e5'],
  emerald: ['#6ee7b7', '#059669'],
  sky: ['#7dd3fc', '#0284c7'],
  green: ['#4ade80', '#15803d'],
  yellow: ['#fde047', '#ca8a04'],
  red: ['#f87171', '#b91c1c'],
  gray: ['#9ca3af', '#374151'],
  purple: ['#c084fc', '#7e22ce'],
  blue: ['#93c5fd', '#2563eb']
};

const BADGE_COLORS = {
  // assessment types
  missions: AVAILABLE_COLORS.indigo,
  quests: AVAILABLE_COLORS.emerald,
  paths: AVAILABLE_COLORS.sky,

  // submission status
  // submitted: AVAILABLE_COLORS.green, // TO BE REMOVED
  // attempting: AVAILABLE_COLORS.yellow, // TO BE REMOVED
  autograded: AVAILABLE_COLORS.purple,
  not_attempted: AVAILABLE_COLORS.gray,
  attempting: AVAILABLE_COLORS.red,
  attempted: AVAILABLE_COLORS.red,

  // grading status
  submitted: AVAILABLE_COLORS.yellow,
  graded: AVAILABLE_COLORS.green,
  grading: AVAILABLE_COLORS.yellow, // TO BE REMOVED
  none: AVAILABLE_COLORS.red, // TO BE REMOVED
  published: AVAILABLE_COLORS.blue
};

export function getBadgeColorFromLabel(label: string) {
  return BADGE_COLORS[label.toLowerCase()] || AVAILABLE_COLORS.gray; //gray
}

type AssessmentTypeBadgeProps = {
  type: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const AssessmentTypeBadge: React.FC<AssessmentTypeBadgeProps> = ({ type, size = 'sm' }) => {
  return (
    <Badge
      text={size === 'xs' ? type.charAt(0).toUpperCase() : type}
      size={size}
      color={getBadgeColorFromLabel(type)}
    />
  );
};

type ColumnFilterBadgeProps = {
  filter: string;
  onRemove: (toRemove: string) => void;
  filtersName: string;
};

const ColumnFilterBadge: React.FC<ColumnFilterBadgeProps> = ({ filter, onRemove, filtersName }) => {
  return (
    <button
      type="button"
      className="grading-overview-filterable-btns"
      onClick={() => onRemove(filter)}
      style={{ marginLeft: '5px' }}
    >
      <Badge
        text={filtersName}
        icon={() => <Icon icon={IconNames.CROSS} style={{ marginRight: '0.25rem' }} />}
        color={getBadgeColorFromLabel(filter)}
      />
    </button>
  );
};

type FilterBadgeProps = {
  filter: ColumnFilter;
  onRemove: (filter: ColumnFilter) => void;
};

const FilterBadge: React.FC<FilterBadgeProps> = ({ filter, onRemove }) => {
  let filterValue = filter.value as string;
  filterValue = filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
  return (
    <button
      type="button"
      className="grading-overview-filterable-btns"
      onClick={() => onRemove(filter)}
      style={{ marginLeft: '5px' }}
    >
      <Badge
        text={filterValue}
        icon={() => <Icon icon={IconNames.CROSS} style={{ marginRight: '0.25rem' }} />}
        color={getBadgeColorFromLabel(filterValue)}
      />
    </button>
  );
};

type ProgressStatusBadgeProps = {
  progress: ProgressStatus;
};

const ProgressStatusBadge: React.FC<ProgressStatusBadgeProps> = ({ progress }) => {
  const statusText = progress.charAt(0).toUpperCase() + progress.slice(1);
  const badgeIcon = () => (
    <Icon
      icon={
        progress === ProgressStatuses.autograded
          ? IconNames.AIRPLANE
          : progress === ProgressStatuses.published
          ? IconNames.ENDORSED
          : progress === ProgressStatuses.graded
          ? IconNames.TICK
          : progress === ProgressStatuses.submitted
          ? IconNames.TIME
          : progress === ProgressStatuses.grading // TODO TO BE REMOVED
          ? IconNames.TIME // TODO TO BE REMOVED
          : progress === ProgressStatuses.none // TODO TO BE REMOVED
          ? IconNames.CROSS // TODO  TO BE REMOVED
          : IconNames.DISABLE
      }
      style={{ marginRight: '0.5rem' }}
    />
  );
  return <Badge text={statusText} color={getBadgeColorFromLabel(progress)} icon={badgeIcon} />;
};

// TO BE REMOVED
type SubmissionStatusBadgeProps = {
  status: string;
};

// TO BE REMOVED
const SubmissionStatusBadge: React.FC<SubmissionStatusBadgeProps> = ({ status }) => {
  const statusText = status.charAt(0).toUpperCase() + status.slice(1);
  return <Badge text={statusText} color={getBadgeColorFromLabel(status)} />;
};

export {
  AssessmentTypeBadge,
  ColumnFilterBadge,
  FilterBadge,
  ProgressStatusBadge,
  SubmissionStatusBadge
};
