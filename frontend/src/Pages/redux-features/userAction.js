import { getUserPending, getUserSuccess, getUserFail} from './userSlice';

import { fetchUser } from "../../api/userApi";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserPending());

    // call api
    const result = await fetchUser();
      console.log("restsuew", result);
    if (result.user && result.user._id)
      return dispatch(getUserSuccess(result.user));

    dispatch(getUserFail("User not found"));
  } catch (error) {
    dispatch(getUserFail(error));
  }
};