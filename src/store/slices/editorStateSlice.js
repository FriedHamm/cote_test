import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  languages: [],
  curLanguage: '',
  codes: null,
  curCode: '',
  initCode: null,
};

// initCode의 형태는
// {language: {language, languageId, code}}

const editorStateSlice = createSlice({
  name: 'editorState',
  initialState,
  reducers: {
    init: (state, action) => {
      state.initCode = action.payload.initCode;
      state.codes = JSON.parse(JSON.stringify(action.payload.initCode));
      state.languages = action.payload.languages;
      state.curLanguage = state.languages[0] || '';
      state.curCode = state.codes[state.curLanguage]?.code;
    },
    setCurCode: (state, action) => {
      st
    }

  },
});

export const { init,  } = editorStateSlice.actions;
export default editorStateSlice.reducer;