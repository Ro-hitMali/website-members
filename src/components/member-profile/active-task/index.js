import PropTypes from 'prop-types';
import classNames from '@components/member-profile/active-task/active-task.module.scss';
import { timeWas } from '@helper-functions/time-was';
import { percentageofDaysRemaining } from '@helper-functions/taskProgress';
import { estimatedDays } from '@helper-functions/estimated-days';
import { progressIndicator } from '@helper-functions/progressIndicator';
// import { useState, useEffect } from 'react';

const ActiveTask = ({ taskDetails }) => {
  const { title, purpose, startedOn, endsOn, percentCompleted } = taskDetails;
  const completedDate = timeWas(startedOn * 1000, false, endsOn * 1000);
  const percentOfTaskLeft = 100 - percentCompleted;
  const percentageOfDaysRemaining = percentageofDaysRemaining(
    startedOn,
    endsOn,
    completedDate
  );
  const showEstimatedDay = estimatedDays(
    percentageOfDaysRemaining,
    percentOfTaskLeft,
    classNames
  );
  const showProgressIndicator = progressIndicator(showEstimatedDay, classNames);

  // eslint-disable-next-line no-console
  console.log(
    completedDate,
    percentCompleted,
    percentOfTaskLeft,
    percentageOfDaysRemaining,
    showEstimatedDay,
    estimatedDays()
  );

  // const showProgressIndicator = classNames.progressIndicatorYellow; // default yellow

  const handleProgressBarColor = () => {
    const colorOptions = [];
    if (percentageOfDaysRemaining >= percentOfTaskLeft) {
      colorOptions.push(classNames.progressIndicatorGreen); // green
    } else if (percentageOfDaysRemaining < 50 && percentOfTaskLeft > 75) {
      colorOptions.push(classNames.progressIndicatorOrange); // orange
    } else if (percentageOfDaysRemaining < 25 && percentOfTaskLeft > 35) {
      colorOptions.push(classNames.progressIndicatorRed); // red
    } else {
      colorOptions.push(classNames.progressIndicatorYellow); // yellow
    }
    return colorOptions;
  };

  return (
    <div className={classNames.container}>
      <div className={classNames.taskSection}>
        <h3 className={classNames.featureTitle}>{title}</h3>
        <p className={classNames.prDescription}>{purpose}</p>
        <div className={classNames.completedData}>
          <span>Estimated Completion in </span>
          <p data-testid="completeDate" className={showEstimatedDay}>
            {completedDate}
          </p>
        </div>
      </div>
      <div className={classNames.progressSection}>
        <div data-testid="progressText" className={classNames.progressText}>
          {percentCompleted > 0 && 'This is in progress'}
        </div>
        <div className={classNames.progressBar}>
          <div
            className={showProgressIndicator}
            style={{
              width: `${percentCompleted}%`,
              backgroundColor: `${handleProgressBarColor}`,
              //      percentageOfDaysRemaining >= percentOfTaskLeft
              //   ? 'green'
              //   : percentageOfDaysRemaining < 50 && percentOfTaskLeft > 75
              //   ? 'orange'
              //   : percentageOfDaysRemaining < 25 && percentOfTaskLeft > 35
              //   ? 'red'
              //   : 'yellow',
            }}
            data-testid="progressIndicator"
          />
        </div>
        <span
          data-testid="percentageCompleted"
          className={classNames.showPercentCompletedText}
        >{`${percentCompleted}% complete`}</span>
      </div>
    </div>
  );
};

ActiveTask.propTypes = {
  taskDetails: PropTypes.shape({
    title: PropTypes.string,
    purpose: PropTypes.string,
    startedOn: PropTypes.string,
    endsOn: PropTypes.string,
    percentCompleted: PropTypes.number,
  }),
};

ActiveTask.defaultProps = {
  taskDetails: {},
};

export default ActiveTask;
