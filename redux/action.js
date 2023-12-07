// action types
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const READ_JOBS_SUCCESS = 'READ_JOBS_SUCCESS';
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';

export const createJobSuccess = (job) => ({
  type: CREATE_JOB_SUCCESS,
  payload: job,
});

export const readJobsSuccess = (jobs) => ({
  type: READ_JOBS_SUCCESS,
  payload: jobs,
});

export const updateJobSuccess = (updateJob) => ({
  type: UPDATE_JOB_SUCCESS,
  payload: updateJob,
});

export const deleteJobSuccess = (jobId) => ({
  type: DELETE_JOB_SUCCESS,
  payload: jobId,
});


// thunk
export const createJob = (job, currentData) => async (dispatch) => {
  try {
    const response = await fetch('https://pwqz9y-8080.csb.app/ToDo/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: currentData.username,
        todos: [...currentData.todos, { name: job, id: currentData.todos.length + 1 }],
        id: currentData.id
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add new job');
    }

    const updatedData = await response.json();// Tạo đối tượng job từ response
    const newJob = {
      name: job,  // Sử dụng giá trị job truyền vào từ tham số hàm
      id: updatedData.todos.length, // Sử dụng độ dài của todos trong response để làm id
    };

    dispatch(createJobSuccess(newJob));
    console.log('Thêm công việc thành công!');
  } catch (error) {
    console.error('Lỗi khi thêm công việc:', error.message);
  }
};

export const updateJob = (jobId, newData, currentData) => async (dispatch) => {
  try {
    // Tìm công việc cần cập nhật trong mảng todos
    const updatedTodos = currentData.todos.map((todo) =>
      todo.id === jobId ? { ...todo, name: newData } : todo
    );

    // Tạo dữ liệu mới sau khi cập nhật
    const updatedData = { ...currentData, todos: updatedTodos };

    // Gọi yêu cầu cập nhật với dữ liệu mới
    const updateResponse = await fetch(`https://pwqz9y-8080.csb.app/ToDo/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update job');
    }

    dispatch(updateJobSuccess(updatedData));
    console.log('Cập nhật công việc thành công!');
  } catch (error) {
    console.error('Lỗi khi cập nhật công việc:', error.message);
  }
};

export const deleteJob = (jobId, currentData) => async (dispatch) => {
  try {
    const response = await fetch(`https://pwqz9y-8080.csb.app/ToDo/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: currentData.username,
        todos: currentData.todos.filter(job => job.id !== jobId),
        id: currentData.id
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete job');
    }

    dispatch(deleteJobSuccess(jobId));
    console.log('Xóa công việc thành công!');
  } catch (error) {
    console.error('Lỗi khi xóa công việc:', error.message);
  }
};

export const readJobs = () => async (dispatch) => {
  try {
    const response = await fetch('https://pwqz9y-8080.csb.app/ToDo/1');
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const jobs = await response.json();
    console.log("API Response:", jobs);
    dispatch(readJobsSuccess(jobs));
  } catch (error) {
    console.error('Lỗi khi đọc công việc:', error.message);
  }
};
