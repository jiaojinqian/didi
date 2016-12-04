export const UPDATE_WIN_SIZE = 'UPDATE_WIN_SIZE';

function updateWinSize(winSize){
  return ({
    type:UPDATE_WIN_SIZE,
    winSize
  });
}

export function upgrateWinSize(winSize){
  return (dispatch,getState) =>  {
    dispatch(updateWinSize(winSize));
  };
}
