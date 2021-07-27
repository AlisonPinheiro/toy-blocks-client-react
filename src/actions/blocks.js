import * as actionTypes from '../constants/actionTypes';

const blockStart = (node) => {
  return {
    type: actionTypes.GET_BLOCKS_START,
    node
  }
}

const blockSuccess = (node, data) => {
  return {
    type: actionTypes.GET_BLOCKS_SUCCESS,
    node,
    data
  }
}

const blockFail = (node, error) => {
  return {
    type: actionTypes.GET_BLOCKS_FAILURE,
    node,
    error
  }
}

export function getBlocks(node) {
  return async dispatch => {
    try {
      dispatch(blockStart(node.url));
      const req = await fetch(`${node.url}/api/v1/blocks`);
      if (req.status >= 400) {
        dispatch(blockFail(node.url, 'Error fetching blocks!'));
      }
      const json = await req.json();
      dispatch(blockSuccess(node.url, json.data));
    } catch (error) {
      dispatch(blockFail(node.url, 'Error fetching blocks!'));
    }
  }
}

export function getBlocksLists(list) {
  return (dispatch) => {
    list.forEach(node => {
      dispatch(getBlocks(node));
    });
  };
}
