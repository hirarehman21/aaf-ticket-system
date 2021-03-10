import axios from 'axios';

const rootUrl = "http://localhost:3001/";
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";
const logoutUrl = rootUrl + "user/logout";
const newAccessJWT = rootUrl + "tokens";

export const userLogin = formData => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(loginUrl, formData);
            console.log("res", res);
            console.log("formdata", formData);
            resolve(res.data);
            console.log("res.data", res.data);
            if (res.data.status === "success") {
                sessionStorage.setItem("accessJwt", res.data.accessJwt);
                localStorage.setItem(
                    "ticketSystem",
                    JSON.stringify({ refreshJwt: res.data.refreshJwt })
                );
            }
        } catch (error) {
            //console.log(error.message);
            console.log("in the catch");
            reject(error);
        }
    });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJwt");

      if (!accessJWT) {
        reject("Invalid Token!");
      }

      const res = await axios.get(userProfileUrl, {
        headers: {
          Authorization: accessJWT,
        },
      });

      resolve(res.data);
    } catch (error) {
      console.log("in user api", error);
      reject(error.message);
    }
  });
};

export const fetchNewAccessJWT = () => {
  return new Promise(async (resolve, reject) => {
    try {
        const { refreshJWT }  = JSON.parse(localStorage.getItem("ticketSystem"));
        console.log("refreshjwttt", refreshJWT);
       // console.log("localstorage", JSON.parse(localStorage.getItem("ticketSystem")));
      if (!refreshJWT) {
          reject("Invalid Token.....!");
          
      }
        console.log("outside not refresh");
        //console.log("newAccessJWT", newAccessJWT);
      const res = await axios.get(newAccessJWT, {
        headers: {
          Authorization: refreshJWT,
        },
      });
        console.log("res.dataa", res.data)
      if (res.data.status === "success") {
        sessionStorage.setItem("accessJwt", res.data.accessJwt);
      }
        console.log("res.dataa", res.data);
      resolve(true);
    } catch (error) {
        // invalid token message
      if (error.message === "Request failed with status code 403") {
         localStorage.removeItem("ticketSystem");
         console.log("fetchnewaccessjwt")
      }

      reject(false);
    }
  });
};

export const userLogout = async () => {
    try {
     const accessJWT = sessionStorage.getItem("accessJwt");
    await axios.delete(logoutUrl, {
      headers: {
        Authorization: accessJWT,
      },
    });
    } catch (error) {
    //console.log("bitch", sessionStorage);
    console.log(error);
  }
};

