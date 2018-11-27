import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';

import styled from 'styled-components';
import AppTheme from '../../../styles';

export const STYLES = {
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  INFO: 'INFO',
};

const MessageWrapper = styled.span.attrs({
  id: 'client-snackbar',
})`
  display: flex;
  alignItems: center;
`;

const getConfiguration = (type: string): Object => {
  const styles = {
    [STYLES.SUCCESS]: {
      Icon: CheckCircleIcon,
      color: AppTheme.colors.success,
    },

    [STYLES.ERROR]: {
      Icon: ErrorIcon,
      color: AppTheme.colors.danger,
    },

    [STYLES.WARNING]: {
      Icon: WarningIcon,
      color: AppTheme.colors.warning,
    },

    [STYLES.INFO]: {
      Icon: InfoIcon,
      color: AppTheme.colors.affirmative,
    },
  };

  return styles[type];
};

const renderContent = (type: string, message: string, onCloseSnackbar: Function): Object => {
  const { Icon, color } = getConfiguration(type);

  return (
    <SnackbarContent
      aria-describedby="client-snackbar"
      style={{
        backgroundColor: color,
      }}
      message={(
        <MessageWrapper>
          <Icon
            style={{
              marginRight: 12,
              fontSize: 20,
            }}
          />
          {message}
        </MessageWrapper>
      )}
      action={[
        <IconButton
          onClick={onCloseSnackbar}
          aria-label="Close"
          color="inherit"
          key="close"
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

type Props = {
  onCloseSnackbar: Function,
  message: string,
  type: string,
  isOpen: boolean,
};

const CustomSnackbar = ({
  onCloseSnackbar,
  message,
  isOpen,
  type,
}: Props): Object => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    onClose={onCloseSnackbar}
    autoHideDuration={3500}
    open={isOpen}
  >
    {type && renderContent(type, message, onCloseSnackbar)}
  </Snackbar>
);

export default CustomSnackbar;