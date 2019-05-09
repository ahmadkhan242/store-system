import Immutable from 'seamless-immutable';

export const Types = {
  BACKUP_REQUEST: 'backup/BACKUP_REQUEST',
  BACKUP_START: 'backup/BACKUP_START',
  BACKUP_SUCCESS: 'backup/BACKUP_SUCCESS',
  BACKUP_FAILURE: 'backup/BACKUP_FAILURE',

  IMPORT_BACKUP_FILE_REQUEST: 'backup/IMPORT_BACKUP_FILE_REQUEST',
  IMPORT_BACKUP_FILE_START: 'backup/IMPORT_BACKUP_FILE_START',
  IMPORT_BACKUP_FILE_SUCCESS: 'backup/IMPORT_BACKUP_FILE_SUCCESS',
  IMPORT_BACKUP_FILE_FAILURE: 'backup/IMPORT_BACKUP_FILE_FAILURE',

  RESET_STATE: 'backup/RESET_STATE',
};

const INITIAL_STATE = Immutable({
  loading: false,
  message: '',
  error: '',
});

export const Creators = {
  exportBackupFile: () => ({
    type: Types.BACKUP_REQUEST,
  }),

  exportBackupFileStart: () => ({
    type: Types.BACKUP_START,
    payload: { message: 'Back em andamento...' },
  }),

  exportBackupSuccess: () => ({
    type: Types.BACKUP_SUCCESS,
    payload: { message: 'Backup executado com Sucesso.' },
  }),

  exportBackupFailure: () => ({
    type: Types.BACKUP_FAILURE,
    payload: { error: 'Houve um problema ao tentar fazer o Backup.' },
  }),

  importBackupFile: () => ({
    type: Types.IMPORT_BACKUP_FILE_REQUEST,
    payload: { message: 'Importar Dados...' },
  }),

  importBackupFileStart: () => ({
    type: Types.IMPORT_BACKUP_FILE_START,
    payload: { message: 'Importar Dados...' },
  }),

  importBackupFileSuccess: () => ({
    type: Types.IMPORT_BACKUP_FILE_SUCCESS,
    payload: { message: 'Dados Importados com Sucesso.' },
  }),

  importBackupFileFailure: () => ({
    type: Types.IMPORT_BACKUP_FILE_FAILURE,
    payload: { error: 'Houve um problema ao tentar importar os Dados.' },
  }),

  resetState: () => ({
    type: Types.RESET_STATE,
  }),
};

const backup = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.BACKUP_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.BACKUP_START:
      return {
        ...state,
        message: payload.message,
        loading: true,
      };

    case Types.BACKUP_SUCCESS:
      return {
        ...state,
        message: payload.message,
        loading: false,
      };

    case Types.BACKUP_FAILURE:
      return {
        error: payload.error,
        loading: false,
        message: '',
      };

    case Types.IMPORT_BACKUP_FILE_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.IMPORT_BACKUP_FILE_START:
      return {
        ...state,
        message: payload.message,
        loading: true,
      };

    case Types.IMPORT_BACKUP_FILE_SUCCESS:
      return {
        ...state,
        message: payload.message,
        loading: false,
      };

    case Types.IMPORT_BACKUP_FILE_FAILURE:
      return {
        error: payload.error,
        loading: false,
        message: '',
      };

    case Types.RESET_STATE:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default backup;
