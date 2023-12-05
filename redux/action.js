export const setSearch = (value) => {
    return {
      type: "SET_SEARCH",
      payload: value
    };
  };
export const setJob = (value) => ({
    type: "SET_JOB",
    payload: value
})
export const setData = (value) => ({
    type: "SET_DATA",
    payload: value
})

export const addJob = (job) => ({
  type: "ADD_JOB",
  payload: job
})