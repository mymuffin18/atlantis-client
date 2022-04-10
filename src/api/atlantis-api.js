import axios from 'axios';

export const API_URL = 'https://atlantis-avion.herokuapp.com';

export const register = async (firstName, lastName, email, password) => {
  let errors = {};
  let data = {};
  try {
    const response = await axios.post(`${API_URL}/users`, {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      },
    });
    console.log(response);
    data = {
      user: response.data,
      token: response.headers.authorization,
    };
  } catch (e) {
    errors = e.response.data.errors;
    console.log(e.response);
  }

  return { data, errors };
};

export const login = async (email, password) => {
  let data = {};
  let error = '';
  try {
    const response = await axios.post(`${API_URL}/users/sign_in`, {
      user: {
        email,
        password,
      },
    });
    console.log(response);
    data = {
      user: response.data.data,
      token: response.headers.authorization,
    };
  } catch (e) {
    error = e.response.data.error;
    // errors = error.response.data.errors.full_messages;
    console.log(error);
  }

  return { data, error };
};

export const admin_login = async (email, password) => {
  let data = {};
  let error = '';
  try {
    const response = await axios.post(`${API_URL}/admins/sign_in`, {
      admin: {
        email,
        password,
      },
    });

    data = {
      user: response.data.data,
      token: response.headers.authorization,
    };
  } catch (e) {
    error = e.response.data.error;
  }

  return { data, error };
};

export const logout = async (token) => {
  try {
    const res = await axios.delete(`${API_URL}/admins/sign_out`, {
      headers: {
        authorization: token,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
};

export const logoutUser = async (token) => {
  try {
    const res = await axios.delete(`${API_URL}/users/sign_out`, {
      headers: {
        authorization: token,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
};

export const UserLists = async (token) => {
  let data = [];
  try {
    const res = await axios.get(`${API_URL}/api/v1/users`, {
      headers: {
        authorization: token,
      },
    });
    data = res.data;
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
  return { data };
};

export const PendingDisasters = async (token) => {
  let data = [];
  try {
    const res = await axios.get(`${API_URL}/api/v1/admins/pending_reports`, {
      headers: {
        authorization: token,
      },
    });
    data = res.data;
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
  return { data };
};

export const ApproveDisapprove = async (id, token) => {
  let data = '';
  try {
    const res = await axios.put(
      `${API_URL}/api/v1/admin_reports/${id}/approve`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    data = res.data;
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
  return { data };
};

export const DeletePending = async (id, token) => {
  let data = '';
  try {
    const res = await axios.delete(`${API_URL}/api/v1/admin_reports/${id}`, {
      headers: {
        authorization: token,
      },
    });
    data = res.data;
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
  return { data };
};

export const ApproveDis = async (token) => {
  let data = [];
  try {
    const res = await axios.get(`${API_URL}/api/v1/admin_reports`, {
      headers: {
        authorization: token,
      },
    });
    data = res.data;
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
  return { data };
};

export const AddWarning = async (id, token) => {
  await axios.put(
    `${API_URL}/api/v1/users/add_warning/${id}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const ClearWarnings = async (id, token) => {
  await axios.put(
    `${API_URL}/api/v1/users/clear_warning/${id}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};
